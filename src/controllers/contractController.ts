import { Request, Response, NextFunction } from 'express';
import { ContractService } from '../services/contractService';

const contractService = new ContractService();

export class ContractController {
  // Get all supply items
  static async getAllSupplies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const supplies = await contractService.getAllSupplyItems();
      res.status(200).json({
        success: true,
        data: supplies
      });
    } catch (error) {
      next(error);
    }
  }

  // Get supply by ID
  static async getSupplyById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { supplyId } = req.params;
      const supply = await contractService.getSupplyById(parseInt(supplyId));
      
      if (!supply) {
        res.status(404).json({
          success: false,
          message: 'Supply not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: supply
      });
    } catch (error) {
      next(error);
    }
  }

  // Get contract status
  static async getContractStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subscriptionId = await contractService.getSubscriptionId();
      const donId = await contractService.getDonId();
      const supplies = await contractService.getAllSupplyItems();
      
      res.status(200).json({
        success: true,
        data: {
          subscriptionId,
          donId,
          totalSupplies: supplies.length,
          contractAddress: process.env.CONTRACT_ADDRESS || '0xed2f10cc7d3bef45c5b4246e2cafb72ef59fbf96'
        }
      });
    } catch (error) {
      next(error);
    }
  }
}