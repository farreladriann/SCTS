import { ethers } from 'ethers';
import contractABI from '../../abi.json';

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0xed2f10cc7d3bef45c5b4246e2cafb72ef59fbf96';
const RPC_URL = process.env.RPC_URL || 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY';

let provider: ethers.Provider;
let contract: ethers.Contract;

// Initialize provider and contract
export const initializeEthers = () => {
  try {
    provider = new ethers.JsonRpcProvider(RPC_URL);
    contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
    console.log('Ethers.js initialized successfully');
  } catch (error) {
    console.error('Error initializing Ethers.js:', error);
  }
};

export const getContract = () => {
  if (!contract) {
    initializeEthers();
  }
  return contract;
};

export const getProvider = () => {
  if (!provider) {
    initializeEthers();
  }
  return provider;
};

export { CONTRACT_ADDRESS };