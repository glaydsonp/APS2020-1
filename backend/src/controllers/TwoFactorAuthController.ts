import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import authConfig from '../config/Auth';
import User from '../schemas/User';
import TFA from '../schemas/TFA';

class TwoFactorAuthController {
    public async create(req: Request, res: Response) {
        const { email, codigo } = req.body;

        const user = await User.findOne({ email });
        const { id, name } = user;

        if (!user) {
            return res.status(400).json({ description: `User not found.` });
        }

        if (!codigo) {
            return res.status(400).json({ description: `Please inform the verification code.` });
        }

        const checkCodigo = await TFA.findOne({ email });
        if (checkCodigo.codigo != codigo) {
            return res.status(400).json({ description: `The verification code does not match.` });
        }

        const dateNow = new Date();
        const expirationDate = new Date(dateNow.getTime() + authConfig.expiresInMiliseconds);
        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign(
                { id },
                authConfig.secret,
                {
                    expiresIn: authConfig.expiresIn,
                }
            ),
            expirationDate
        });
    }
}

export default new TwoFactorAuthController();