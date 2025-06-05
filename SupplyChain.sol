// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * @title SupplyChain
 * @author Gemini
 * @notice Kontrak ini mengelola alur rantai pasok dari Producer -> Distributor -> Consumer.
 * Verifikasi peran (role) dilakukan secara asinkron menggunakan Chainlink Functions
 * yang memanggil API eksternal.
 */
contract SupplyChain is FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    // ==============
    // ENUM & STRUCTS
    // ==============
    
    enum Role { None, Producer, Distributor, Consumer }
    
    struct HistoryEntry {
        address from;
        address to;
        uint256 timestamp;
        string action; // e.g., "MINT", "TRANSFER"
    }

    struct SupplyItem {
        uint256 id;
        string namaBarang;
        uint256 createdAt;
        uint256 updatedAt;
        address currentOwner;
        Role currentOwnerRole;
        HistoryEntry[] history;
    }

    // ==============
    // STATE VARIABLES
    // ==============

    // --- Chainlink Functions ---
    uint64 public s_subscriptionId;
    bytes32 public constant DON_ID = 0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000; // DON ID untuk Sepolia
    uint32 public constant GAS_LIMIT = 300000;

    // --- Supply Chain Data ---
    mapping(uint256 => SupplyItem) public supplyItems;
    uint256 private s_supplyIdCounter;

    // --- Request Tracking ---
    // Mapping dari requestId ke detail permintaan yang sedang berlangsung
    struct PendingMintRequest {
        address requester;
        string namaBarang;
    }
    mapping(bytes32 => PendingMintRequest) public s_pendingMintRequests;

    struct PendingTransferRequest {
        address from;
        address to;
        uint256 supplyId;
    }
    mapping(bytes32 => PendingTransferRequest) public s_pendingTransferRequests;

    // --- Oracle JS Source Code ---
    // Kode ini akan dijalankan oleh node Chainlink.
    // 'args[0]' akan digantikan dengan alamat yang ingin diverifikasi.
    string private constant SOURCE_CODE =
        "const addressToVerify = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://scts.vercel.app/akun/${addressToVerify}`"
        "});"
        "if (apiResponse.error) {"
        "   throw new Error('API request failed');"
        "}"
        "return Functions.encodeString(JSON.stringify(apiResponse.data));";

    // ==============
    // EVENTS
    // ==============

    event RequestSent(bytes32 indexed requestId, address indexed requester);
    event RequestFulfilled(bytes32 indexed requestId, bytes response, bytes err);
    event SupplyMinted(uint256 indexed supplyId, string namaBarang, address indexed producer);
    event SupplyTransferred(uint256 indexed supplyId, address indexed from, address indexed to, Role newRole);
    event RoleVerificationFailed(bytes32 indexed requestId, string reason);


    // ==============
    // CONSTRUCTOR
    // ==============

    constructor(uint64 subscriptionId) FunctionsClient(0xb83E47C2bC239B3bf370bc41e1459A34b41238D0) { // Router Chainlink Sepolia
        s_subscriptionId = subscriptionId;
    }

    // ===================================
    // PUBLIC FUNCTIONS - USER ACTIONS
    // ===================================

    /**
     * @notice Langkah 1: Meminta untuk membuat (mint) supply baru.
     * @dev Ini mengirimkan permintaan ke Chainlink Functions untuk memverifikasi peran msg.sender.
     * @param _namaBarang Nama barang yang akan dibuat.
     */
    function requestMintSupply(string memory _namaBarang) external returns (bytes32 requestId) {
        require(bytes(_namaBarang).length > 0, "Nama barang tidak boleh kosong");
        
        string[] memory args = new string[](1);
        args[0] = _addressToString(msg.sender);

        requestId = _sendRequest(SOURCE_CODE, args);
        
        s_pendingMintRequests[requestId] = PendingMintRequest({
            requester: msg.sender,
            namaBarang: _namaBarang
        });

        emit RequestSent(requestId, msg.sender);
        return requestId;
    }

    /**
     * @notice Langkah 1: Meminta untuk mentransfer supply ke alamat lain.
     * @dev Ini mengirimkan permintaan ke Chainlink Functions untuk memverifikasi peran alamat penerima (_to).
     * @param _supplyId ID dari supply yang akan ditransfer.
     * @param _to Alamat penerima.
     */
    function requestTransferSupply(uint256 _supplyId, address _to) external returns (bytes32 requestId) {
        SupplyItem storage item = supplyItems[_supplyId];
        require(item.id != 0, "Supply tidak ditemukan");
        require(item.currentOwner == msg.sender, "Hanya pemilik saat ini yang bisa mentransfer");
        require(_to != address(0), "Alamat penerima tidak valid");

        // Memvalidasi alur transfer
        if (item.currentOwnerRole == Role.Producer) {
            // Transfer selanjutnya harus ke Distributor
        } else if (item.currentOwnerRole == Role.Distributor) {
            // Transfer selanjutnya harus ke Consumer
        } else {
            revert("Transfer tidak diizinkan dari peran ini");
        }

        string[] memory args = new string[](1);
        args[0] = _addressToString(_to);

        requestId = _sendRequest(SOURCE_CODE, args);

        s_pendingTransferRequests[requestId] = PendingTransferRequest({
            from: msg.sender,
            to: _to,
            supplyId: _supplyId
        });

        emit RequestSent(requestId, msg.sender);
        return requestId;
    }

    // =====================================
    // EXTERNAL/PUBLIC VIEW FUNCTIONS
    // =====================================

    /**
     * @notice Mendapatkan seluruh data dan histori dari sebuah supply.
     * @param _supplyId ID dari supply yang ingin dilihat.
     * @return SupplyItem struct yang berisi semua detail.
     */
    function getSupplyChainHistory(uint256 _supplyId) external view returns (SupplyItem memory, HistoryEntry[] memory) {
        require(supplyItems[_supplyId].id != 0, "Supply tidak ditemukan");
        SupplyItem storage item = supplyItems[_supplyId];
        return (item, item.history);
    }
    
    // =====================================
    // INTERNAL & CHAINLINK FUNCTIONS
    // =====================================

    /**
     * @notice Langkah 2: Fungsi callback yang dipanggil oleh oracle Chainlink setelah mendapatkan data.
     * @dev Memproses hasil dari verifikasi peran dan mengeksekusi mint atau transfer jika valid.
     */
    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        emit RequestFulfilled(requestId, response, err);

        if (err.length > 0) {
            emit RoleVerificationFailed(requestId, "Chainlink request error");
            _cleanupRequests(requestId);
            return;
        }

        string memory role = _parseRoleFromJSON(string(response));

        // Cek apakah ini adalah permintaan MINTING
        if (s_pendingMintRequests[requestId].requester != address(0)) {
            if (_compareStrings(role, "Producer")) {
                _executeMint(requestId);
            } else {
                emit RoleVerificationFailed(requestId, "Bukan Producer");
            }
        }
        // Cek apakah ini adalah permintaan TRANSFER
        else if (s_pendingTransferRequests[requestId].from != address(0)) {
            PendingTransferRequest memory req = s_pendingTransferRequests[requestId];
            SupplyItem storage item = supplyItems[req.supplyId];

            bool transferValid = false;
            Role newRole = Role.None;

            if (item.currentOwnerRole == Role.Producer && _compareStrings(role, "Distributor")) {
                transferValid = true;
                newRole = Role.Distributor;
            } else if (item.currentOwnerRole == Role.Distributor && _compareStrings(role, "Consumer")) {
                transferValid = true;
                newRole = Role.Consumer;
            }

            if (transferValid) {
                _executeTransfer(requestId, newRole);
            } else {
                emit RoleVerificationFailed(requestId, "Peran penerima tidak sesuai alur");
            }
        }
        
        _cleanupRequests(requestId);
    }

    function _executeMint(bytes32 requestId) private {
        PendingMintRequest memory req = s_pendingMintRequests[requestId];
        
        s_supplyIdCounter++;
        uint256 newId = s_supplyIdCounter;
        
        supplyItems[newId].id = newId;
        supplyItems[newId].namaBarang = req.namaBarang;
        supplyItems[newId].createdAt = block.timestamp;
        supplyItems[newId].updatedAt = block.timestamp;
        supplyItems[newId].currentOwner = req.requester;
        supplyItems[newId].currentOwnerRole = Role.Producer;
        
        supplyItems[newId].history.push(HistoryEntry({
            from: address(0),
            to: req.requester,
            timestamp: block.timestamp,
            action: "MINT"
        }));

        emit SupplyMinted(newId, req.namaBarang, req.requester);
    }

    function _executeTransfer(bytes32 requestId, Role newRole) private {
        PendingTransferRequest memory req = s_pendingTransferRequests[requestId];
        SupplyItem storage item = supplyItems[req.supplyId];

        item.currentOwner = req.to;
        item.updatedAt = block.timestamp;
        item.currentOwnerRole = newRole;

        item.history.push(HistoryEntry({
            from: req.from,
            to: req.to,
            timestamp: block.timestamp,
            action: "TRANSFER"
        }));
        
        emit SupplyTransferred(req.supplyId, req.from, req.to, newRole);
    }
    
    function _sendRequest(string memory source, string[] memory args) private returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (args.length > 0) {
            req.setArgs(args);
        }

        return _sendRequest(req.encodeCBOR(), s_subscriptionId, GAS_LIMIT, DON_ID);
    }
    
    function _cleanupRequests(bytes32 requestId) private {
        // Hapus permintaan yang sudah selesai untuk menghemat gas dan mencegah replay.
        delete s_pendingMintRequests[requestId];
        delete s_pendingTransferRequests[requestId];
    }

    // =================
    // HELPER FUNCTIONS
    // =================

    function _parseRoleFromJSON(string memory json) private pure returns (string memory) {
        bytes memory jsonBytes = bytes(json);
        // Mencari `{"role":"`
        for (uint i = 0; i < jsonBytes.length - 8; i++) {
            if (
                jsonBytes[i] == '{' &&
                jsonBytes[i+1] == '"' && jsonBytes[i+2] == 'r' && jsonBytes[i+3] == 'o' && jsonBytes[i+4] == 'l' && jsonBytes[i+5] == 'e' && jsonBytes[i+6] == '"' &&
                jsonBytes[i+7] == ':' && jsonBytes[i+8] == '"'
            ) {
                uint start = i + 9;
                for (uint j = start; j < jsonBytes.length; j++) {
                    if (jsonBytes[j] == '"') {
                        uint end = j;
                        bytes memory roleBytes = new bytes(end - start);
                        for (uint k = 0; k < roleBytes.length; k++) {
                            roleBytes[k] = jsonBytes[start + k];
                        }
                        return string(roleBytes);
                    }
                }
            }
        }
        return "Unknown"; // atau ""
    }

    function _addressToString(address _addr) private pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }
    
    function _compareStrings(string memory a, string memory b) private pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    // ========================
    // ADMIN-ONLY FUNCTIONS
    // ========================

    function updateSubscriptionId(uint64 _newSubscriptionId) external {
        // Anda mungkin ingin menambahkan modifier onlyOwner di sini
        s_subscriptionId = _newSubscriptionId;
    }
}