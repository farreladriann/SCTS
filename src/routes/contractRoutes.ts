import express from 'express';
import { ContractController } from '../controllers/contractController';

const router = express.Router();

router.get('/supplies', ContractController.getAllSupplies);
router.get('/supplies/:supplyId', ContractController.getSupplyById);
router.get('/status', ContractController.getContractStatus);

export default router;