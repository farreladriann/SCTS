import express from 'express';
import { ContractController } from '../controllers/contractController';

const router = express.Router();

// GET /contract/supplies - Get all supplies
router.get('/supplies', ContractController.getAllSupplies);

// GET /contract/supplies/:supplyId - Get supply by ID
router.get('/supplies/:supplyId', ContractController.getSupplyById);

// GET /contract/status - Get contract status
router.get('/status', ContractController.getContractStatus);

export default router;