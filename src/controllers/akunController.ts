import { Request, Response, NextFunction } from 'express';
import { AkunModel } from '../models/Akun';

// Controller to get all Akun data
export class akunController {
    static async getAllAkun(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const akunData = await AkunModel.find();
            res.status(200).json(akunData);
        } catch (error) {
            next(error);
        }
    }

    // Create new account
    static async createAkun(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { publicKey, role } = req.body;

            // Validate input
            if (!publicKey || !role) {
                res.status(400).json({
                    success: false,
                    message: 'Public key and role are required'
                });
                return;
            }

            // Check if account already exists
            const existingAkun = await AkunModel.findOne({ publicKey });
            if (existingAkun) {
                res.status(409).json({
                    success: false,
                    message: 'Account with this public key already exists'
                });
                return;
            }

            // Create new account
            const newAkun = new AkunModel({
                publicKey,
                role
            });

            const savedAkun = await newAkun.save();

            res.status(201).json({
                success: true,
                message: 'Account created successfully',
                data: savedAkun
            });
        } catch (error) {
            console.error('Error creating account:', error);
            next(error);
        }
    }

    // Get account by public key
    static async getAkunByPublicKey(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { publicKey } = req.params;
            const akun = await AkunModel.findOne({ publicKey });

            if (!akun) {
                res.status(404).json({ message: 'Account not found' });
                return;
            }

            res.status(200).json({role: akun.role});
        } catch (error) {
            next(error);
        }
    }
}