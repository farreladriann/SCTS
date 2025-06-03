import express from 'express';
import { akunController } from '../controllers/akunController';

const router = express.Router();

// POST /ogout
// This route handles user logout (currently commented out)
router.get('/', akunController.getAllAkun);

export default router;