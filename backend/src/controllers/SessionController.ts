import { Request, Response } from 'express';
import bcrypt from "bcrypt";

import User from '../schemas/User';
import { SendEmail } from '../utils/SendEmail';

class SessionController {
    public async create(req: Request, res: Response) {
        const { email, password } = req.body;

        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            return res.status(400).json({ description: `User not found.` });
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (checkPassword) {
            SendEmail(email);
            return res.json({ message: `An email was sent containing the verification code.` });
        } else {
            return res.status(400).json({ description: `The password does not match.` });
        }
    }
}

export default new SessionController();