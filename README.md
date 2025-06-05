# SCTS - Supply Chain Tracking System

SCTS adalah sistem pelacakan rantai pasok berbasis blockchain yang menggunakan Ethereum smart contract dan Chainlink Functions untuk verifikasi peran (role) secara otomatis. Sistem ini memungkinkan tracking barang dari Producer → Distributor → Consumer dengan verifikasi peran yang terintegrasi dengan database MongoDB.

## 🌐 Live Demo
Aplikasi sudah dideploy dan dapat diakses secara publik di:
**https://scts.vercel.app**

## 📹 Video Demo
Lihat demo lengkap aplikasi di YouTube:
**[SCTS Demo Video](https://youtu.be/2dxk6PcjzAY)**

## Fitur Utama
- ✅ Role-based access control (Producer, Distributor, Consumer)
- ✅ Supply chain tracking dengan blockchain
- ✅ Chainlink Functions integration untuk verifikasi peran
- ✅ Frontend dashboard dengan MetaMask integration
- ✅ RESTful API backend dengan Express.js
- ✅ MongoDB database untuk manajemen akun

## Tech Stack
- **Smart Contract**: Solidity (Chainlink Functions)
- **Backend**: Node.js, Express.js, TypeScript, MongoDB
- **Frontend**: Vanilla HTML/CSS/JS dengan Ethers.js
- **Blockchain**: Ethereum Sepolia Testnet
- **Oracle**: Chainlink Functions untuk verifikasi role off-chain

## Oracle Integration
Sistem menggunakan **Chainlink Functions** sebagai oracle untuk verifikasi role secara otomatis:
- Smart contract dapat mengakses data role dari database MongoDB off-chain
- Verifikasi dilakukan sebelum transfer supply antar role
- Memastikan hanya role yang valid (Producer → Distributor → Consumer) yang dapat melakukan transfer
- Oracle menghubungkan data on-chain dengan database off-chain secara trustless

## Setup Instructions

### 1. Global Dependencies
Install required global packages:
```bash
npm install -g typescript ts-node nodemon
```

### 2. Local Dependencies
Clone repository dan install dependencies:
```bash
git clone https://github.com/farreladriann/SCTS.git
cd SCTS
npm install
```

### 3. Environment Setup
Buat file `.env` di root directory dengan konfigurasi berikut:
```env
MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/scts?retryWrites=true&w=majority"
CONTRACT_ADDRESS="0x75a4666eaa87d72f246bee1c8d7b58b7d2714601"
RPC_URL="https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"
```

**Catatan**: Pastikan untuk mengganti:
- MongoDB connection string dengan credentials Anda
- Infura project ID dengan yang valid

### 4. Menjalankan Aplikasi

#### Development Mode
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3500`

### 5. Mengakses Frontend
Buka browser dan navigasi ke:
```
http://localhost:3500
```

Frontend dashboard akan otomatis terbuka dengan interface MetaMask integration.

## Cara Penggunaan & Testing

### Setup Wallet
1. **Install MetaMask** browser extension
2. **Switch ke Sepolia Testnet** di MetaMask
3. **Dapatkan test ETH** dari [Sepolia Faucet](https://sepoliafaucet.com/)
4. **Connect Wallet** dengan klik tombol "Connect MetaMask"

### Testing Flow

#### 1. Role Assignment
- Saat pertama kali connect, Anda akan diminta memilih role
- Pilih salah satu: **Producer**, **Distributor**, atau **Consumer**
- Role akan tersimpan di database dan dikaitkan dengan address wallet

#### 2. Producer Testing
Jika memilih role **Producer**:
- Input nama produk di form "Mint New Supply"
- Klik "Mint New Supply"
- Confirm transaksi di MetaMask
- Tunggu hingga transaksi selesai (akan muncul di activity logs)

#### 3. Transfer Testing
Untuk transfer supply:
- Pastikan Anda adalah owner dari supply item
- Klik tombol "Transfer Supply" pada item yang Anda miliki
- Masukkan address wallet tujuan (pastikan address tersebut sudah memiliki role yang sesuai)
- Confirm transfer di MetaMask

#### 4. Supply Chain Flow Testing
Testing complete flow:
1. **Producer** mint supply baru
2. **Producer** transfer ke **Distributor**
3. **Distributor** transfer ke **Consumer**

#### 5. Monitoring
- **Activity Logs**: Monitor semua aktivitas di section logs
- **Supply List**: Refresh untuk melihat update terbaru
- **Transaction Status**: Track status transaksi real-time
- **Etherscan**: Klik link untuk melihat detail transaksi

**⚠️ Catatan Penting**: Perubahan supply tidak langsung muncul setelah transaksi berhasil. Biasanya memerlukan waktu sekitar **1 menit** setelah transaksi berhasil untuk data supply terupdate di interface. Hal ini disebabkan oleh:
- Proses konfirmasi block di Sepolia testnet
- Sinkronisasi data antara smart contract dan database
- Chainlink Functions processing time untuk verifikasi role

**🔄 Oracle Issue**: Terkadang meskipun semua konfigurasi sudah benar, transaksi berhasil tetapi oracle (Chainlink Functions) gagal menerima atau memproses data dari API backend. Jika hal ini terjadi:
- **Solusi**: Ulangi transaksi sekali lagi
- Biasanya berhasil pada percobaan kedua atau ketiga
- Hal ini normal dalam testnet environment
- Transaksi tetap tercatat di blockchain, tapi verifikasi role gagal

### API Endpoints
Backend menyediakan API endpoints:
- `GET /akun` - Get all accounts
- `POST /akun` - Create new account
- `GET /akun/:publicKey` - Get account by public key
- `GET /contract/supplies` - Get all supply items
- `GET /contract/supplies/:supplyId` - Get specific supply
- `GET /contract/status` - Get contract status

### Troubleshooting
- **MetaMask tidak connect**: Pastikan sudah switch ke Sepolia testnet
- **Transaction gagal**: Pastikan balance ETH cukup untuk gas fee
- **Role verification failed**: Pastikan address tujuan sudah memiliki role yang sesuai
- **API error**: Check MongoDB connection dan pastikan .env sudah benar

### Smart Contract
Contract address: `0x75a4666eaa87d72f246bee1c8d7b58b7d2714601`
Deployed on Sepolia testnet dengan Chainlink Functions integration.

---

Untuk pertanyaan atau issue, silakan buat GitHub issue atau hubungi development team.