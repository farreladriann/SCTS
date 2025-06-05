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
      const supplies: any[] = [];
      let supplyId = 1;
      
      // Keep fetching until we get an error (supply doesn't exist)
      while (true) {
        try {
          const supply = await this.contract.supplyItems(supplyId);
          if (supply.id.toString() === '0') break;
          
          const [supplyData, history] = await this.contract.getSupplyChainHistory(supplyId);
          
          supplies.push({
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
          });
          
          supplyId++;
        } catch (error) {
          break; // No more supplies
        }
      }
      
      return supplies;
    } catch (error) {
      console.error('Error fetching supply items:', error);
      return [];
    }
  }

  // Get specific supply by ID
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

  // Get contract subscription ID
  async getSubscriptionId(): Promise<string> {
    try {
      const subId = await this.contract.s_subscriptionId();
      return subId.toString();
    } catch (error) {
      console.error('Error fetching subscription ID:', error);
      return '0';
    }
  }

  // Get DON ID
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