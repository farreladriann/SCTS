import express from 'express';
import { akunController } from '../controllers/akunController';

const router = express.Router();

// GET /akun - Get all accounts
router.get('/', akunController.getAllAkun);

// POST /akun - Create new account
router.post('/', akunController.createAkun);

// GET /akun/:publicKey - Get account by public key
router.get('/:publicKey', akunController.getAkunByPublicKey);

export default router;