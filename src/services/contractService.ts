import { ethers } from 'ethers';
import { getContract, getProvider } from '../config/ethers';

export class ContractService {
  private contract: ethers.Contract;
  private provider: ethers.Provider;

  constructor() {
    this.contract = getContract();
    this.provider = getProvider();
  }

  // Get all supply items from contract
  async getAllSupplyItems(): Promise<any[]> {
    try {
      // Use the new getAllSupplyChainHistory function from the smart contract
      const allSupplies = await this.contract.getAllSupplyChainHistory();
      
      return allSupplies.map((supply: any) => ({
        id: supply.id.toString(),
        namaBarang: supply.namaBarang,
        createdAt: new Date(Number(supply.createdAt) * 1000),
        updatedAt: new Date(Number(supply.updatedAt) * 1000),
        currentOwner: supply.currentOwner,
        currentOwnerRole: this.getRoleName(supply.currentOwnerRole),
        history: supply.history.map((h: any) => ({
          from: h.from,
          to: h.to,
          timestamp: new Date(Number(h.timestamp) * 1000),
          action: h.action
        }))
      }));
    } catch (error) {
      console.error('Error fetching supply items:', error);
      return [];
    }
  }

  async getSupplyById(supplyId: number): Promise<any | null> {
    try {
      const [supplyData, history] = await this.contract.getSupplyChainHistory(supplyId);
      
      return {
        id: supplyData.id.toString(),
        namaBarang: supplyData.namaBarang,
        createdAt: new Date(Number(supplyData.createdAt) * 1000),
        updatedAt: new Date(Number(supplyData.updatedAt) * 1000),
        currentOwner: supplyData.currentOwner,
        currentOwnerRole: this.getRoleName(supplyData.currentOwnerRole),
        history: history.map((h: any) => ({
          from: h.from,
          to: h.to,
          timestamp: new Date(Number(h.timestamp) * 1000),
          action: h.action
        }))
      };
    } catch (error) {
      console.error('Error fetching supply by ID:', error);
      return null;
    }
  }

  async getSubscriptionId(): Promise<string> {
    try {
      const subId = await this.contract.s_subscriptionId();
      return subId.toString();
    } catch (error) {
      console.error('Error fetching subscription ID:', error);
      return '0';
    }
  }

  async getDonId(): Promise<string> {
    try {
      const donId = await this.contract.DON_ID();
      return donId;
    } catch (error) {
      console.error('Error fetching DON ID:', error);
      return '0x0';
    }
  }

  private getRoleName(roleNumber: number): string {
    const roles = ['None', 'Producer', 'Distributor', 'Consumer'];
    return roles[roleNumber] || 'Unknown';
  }
}