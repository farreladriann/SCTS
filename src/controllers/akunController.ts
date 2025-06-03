import { Request, Response } from 'express';
import { AkunModel } from '../models/Akun';

// Controller to get all Akun data
export class akunController {
    static async getAllAkun(_req: Request, res: Response): Promise<void> {
        try {
            const akunData = await AkunModel.find();
            res.status(200).json(akunData);
        } catch (error) {
            console.error('Error fetching Akun data:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}