const CONTRACT_ADDRESS = "0x75a4666eaa87d72f246bee1c8d7b58b7d2714601";
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "subscriptionId",
				"type": "uint64"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "EmptyArgs",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EmptySource",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "response",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "err",
				"type": "bytes"
			}
		],
		"name": "handleOracleFulfillment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "NoInlineSecrets",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "OnlyRouterCanFulfill",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "RequestFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "response",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "err",
				"type": "bytes"
			}
		],
		"name": "RequestFulfilled",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_namaBarang",
				"type": "string"
			}
		],
		"name": "requestMintSupply",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "RequestSent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			}
		],
		"name": "RequestSent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_supplyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "requestTransferSupply",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "RoleVerificationFailed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "supplyId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "namaBarang",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "producer",
				"type": "address"
			}
		],
		"name": "SupplyMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "supplyId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum SupplyChain.Role",
				"name": "newRole",
				"type": "uint8"
			}
		],
		"name": "SupplyTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_newSubscriptionId",
				"type": "uint64"
			}
		],
		"name": "updateSubscriptionId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DON_ID",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GAS_LIMIT",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_supplyId",
				"type": "uint256"
			}
		],
		"name": "getSupplyChainHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "namaBarang",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "createdAt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "updatedAt",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "currentOwner",
						"type": "address"
					},
					{
						"internalType": "enum SupplyChain.Role",
						"name": "currentOwnerRole",
						"type": "uint8"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "action",
								"type": "string"
							}
						],
						"internalType": "struct SupplyChain.HistoryEntry[]",
						"name": "history",
						"type": "tuple[]"
					}
				],
				"internalType": "struct SupplyChain.SupplyItem",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "action",
						"type": "string"
					}
				],
				"internalType": "struct SupplyChain.HistoryEntry[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "s_pendingMintRequests",
		"outputs": [
			{
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "namaBarang",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "s_pendingTransferRequests",
		"outputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "supplyId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_subscriptionId",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "supplyItems",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "namaBarang",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "updatedAt",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "currentOwner",
				"type": "address"
			},
			{
				"internalType": "enum SupplyChain.Role",
				"name": "currentOwnerRole",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider, signer, contract;
let userAccount = null;
let userRole = null;
let currentTransferSupply = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkMetaMaskConnection();
    loadSupplies();
});

function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('refreshSupplies').addEventListener('click', loadSupplies);
    document.getElementById('mintSupply').addEventListener('click', mintSupply);
    document.getElementById('confirmTransfer').addEventListener('click', confirmTransfer);
    document.getElementById('cancelTransfer').addEventListener('click', closeTransferModal);
    
    // Role selection
    document.querySelectorAll('.btn-role').forEach(btn => {
        btn.addEventListener('click', () => selectRole(btn.dataset.role));
    });
}

async function checkMetaMaskConnection() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
				addLog('MetaMask is connected with account: ' + accounts[0]);
                await initializeWeb3();
                await updateWalletUI(accounts[0]);
                await checkUserRole();
            }
        } catch (error) {
            addLog('Error checking MetaMask connection: ' + error.message, 'error');
        }
    }
}

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed! Please install MetaMask to continue.');
        return;
    }

    try {
        addLog('Connecting to MetaMask...');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await initializeWeb3();
        await updateWalletUI(accounts[0]);
        await checkUserRole();
        addLog('Successfully connected to MetaMask!', 'success');
    } catch (error) {
        addLog('Error connecting to MetaMask: ' + error.message, 'error');
    }
}

async function initializeWeb3() {
    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        userAccount = await signer.getAddress();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111) {
            addLog('Please switch to Sepolia testnet!', 'error');
        }
    } catch (error) {
        addLog('Error initializing Web3: ' + error.message, 'error');
    }
}

async function updateWalletUI(address) {
    try {
        document.getElementById('wallet-info').style.display = 'block';
        document.getElementById('userAddress').textContent = 
            address.substring(0, 6) + '...' + address.substring(38);
        
        if (provider) {
            const balance = await provider.getBalance(address);
            document.getElementById('userBalance').textContent = 
                ethers.utils.formatEther(balance).substring(0, 6);
        } else {
            document.getElementById('userBalance').textContent = '0.0';
        }
        
        document.getElementById('connectWallet').textContent = 'Connected';
        document.getElementById('connectWallet').disabled = true;
        document.getElementById('connectWallet').classList.add('btn-success');
    } catch (error) {
        addLog('Error updating wallet UI: ' + error.message, 'error');
    }
}

async function checkUserRole() {
    try {
        const response = await fetch(`/akun/${userAccount}`);
        if (response.ok) {
            const data = await response.json();
            userRole = data.role;
            document.getElementById('userRole').textContent = userRole;
            updateUIForRole();
        } else {
            document.getElementById('userRole').textContent = 'Not assigned';
            document.getElementById('role-selection').style.display = 'block';
        }
    } catch (error) {
        addLog('Error checking user role: ' + error.message, 'error');
        document.getElementById('role-selection').style.display = 'block';
    }
}

async function selectRole(role) {
    try {
        addLog(`Selecting role: ${role}...`);
        const response = await fetch('/akun', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                publicKey: userAccount,
                role: role
            })
        });
        
        if (response.ok) {
            userRole = role;
            document.getElementById('userRole').textContent = role;
            document.getElementById('role-selection').style.display = 'none';
            updateUIForRole();
            addLog(`Role set to ${role}!`, 'success');
        } else {
            const error = await response.json();
            addLog('Error setting role: ' + error.message, 'error');
        }
    } catch (error) {
        addLog('Error selecting role: ' + error.message, 'error');
    }
}

function updateUIForRole() {
    if (userRole === 'Producer') {
        document.getElementById('producer-actions').style.display = 'block';
    } else {
        document.getElementById('producer-actions').style.display = 'none';
    }
}

async function mintSupply() {
    const productName = document.getElementById('productName').value.trim();
    if (!productName) {
        alert('Please enter a product name');
        return;
    }

    try {
        addLog(`Minting supply: ${productName}...`);
        const tx = await contract.requestMintSupply(productName);
        showTransactionStatus(tx.hash);
        
        const receipt = await tx.wait();
        addLog('Supply minted successfully!', 'success');
        hideTransactionStatus();
        
        document.getElementById('productName').value = '';
        setTimeout(loadSupplies, 2000); // Reload supplies after 2 seconds
    } catch (error) {
        addLog('Error minting supply: ' + error.message, 'error');
        hideTransactionStatus();
    }
}

async function loadSupplies() {
    try {
        const response = await fetch('/contract/supplies');
        const data = await response.json();
        
        if (data.success) {
            displaySupplies(data.data);
        } else {
            addLog('Error loading supplies: ' + data.message, 'error');
        }
    } catch (error) {
        addLog('Error fetching supplies: ' + error.message, 'error');
    }
}

function displaySupplies(supplies) {
    const container = document.getElementById('supplies-list');
    
    if (supplies.length === 0) {
        container.innerHTML = '<p>No supplies found.</p>';
        return;
    }
    
    container.innerHTML = supplies.map(supply => `
        <div class="supply-item">
            <div class="supply-header">
                <h3>${supply.namaBarang} #${supply.id}</h3>
                <span class="role-badge role-${supply.currentOwnerRole.toLowerCase()}">
                    ${supply.currentOwnerRole}
                </span>
            </div>
            <div class="supply-details">
                <p><strong>Owner:</strong> ${supply.currentOwner.substring(0, 6)}...${supply.currentOwner.substring(38)}</p>
                <p><strong>Created:</strong> ${new Date(supply.createdAt).toLocaleString()}</p>
                <p><strong>Updated:</strong> ${new Date(supply.updatedAt).toLocaleString()}</p>
            </div>
            ${canTransfer(supply) ? `
                <button class="btn btn-transfer" onclick="openTransferModal(${supply.id}, '${supply.namaBarang}')">
                    Transfer Supply
                </button>
            ` : ''}
            <div class="supply-history">
                <h4>History:</h4>
                ${supply.history.map(h => `
                    <div class="history-entry">
                        <span class="action">${h.action}</span>
                        <span class="addresses">${h.from.substring(0, 6)}...${h.from.substring(38)} → ${h.to.substring(0, 6)}...${h.to.substring(38)}</span>
                        <span class="timestamp">${new Date(h.timestamp).toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function canTransfer(supply) {
    return userAccount && 
           supply.currentOwner.toLowerCase() === userAccount.toLowerCase() && 
           userRole !== 'Consumer';
}

function openTransferModal(supplyId, productName) {
    currentTransferSupply = supplyId;
    document.getElementById('transferSupplyId').textContent = supplyId;
    document.getElementById('transferProductName').textContent = productName;
    document.getElementById('transferModal').style.display = 'block';
}

function closeTransferModal() {
    document.getElementById('transferModal').style.display = 'none';
    document.getElementById('transferToAddress').value = '';
    currentTransferSupply = null;
}

async function confirmTransfer() {
    const toAddress = document.getElementById('transferToAddress').value.trim();
    if (!toAddress || !ethers.utils.isAddress(toAddress)) {
        alert('Please enter a valid address');
        return;
    }

    try {
        addLog(`Transferring supply #${currentTransferSupply} to ${toAddress}...`);
        const tx = await contract.requestTransferSupply(currentTransferSupply, toAddress);
        showTransactionStatus(tx.hash);
        
        const receipt = await tx.wait();
        addLog('Transfer request sent successfully!', 'success');
        hideTransactionStatus();
        closeTransferModal();
        
        setTimeout(loadSupplies, 2000);
    } catch (error) {
        addLog('Error transferring supply: ' + error.message, 'error');
        hideTransactionStatus();
    }
}

function showTransactionStatus(txHash) {
    document.getElementById('transaction-status').style.display = 'block';
    document.getElementById('txHash').textContent = txHash.substring(0, 10) + '...' + txHash.substring(56);
    document.getElementById('txStatus').textContent = 'Pending...';
    document.getElementById('txLink').href = `https://sepolia.etherscan.io/tx/${txHash}`;
}

function hideTransactionStatus() {
    document.getElementById('transaction-status').style.display = 'none';
}

function addLog(message, type = 'info') {
    const logsContainer = document.getElementById('logs');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    logEntry.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
    
    logsContainer.appendChild(logEntry);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

// Auto-refresh supplies every 30 seconds
setInterval(loadSupplies, 30000);