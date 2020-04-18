import { Request, Response } from 'express'
import bcrypt from 'bcrypt';

import User from '../schemas/User'

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const users = await User.find();

        return res.json(users)
    }

    public async create(req: Request, res: Response): Promise<Response> {
        // checa se o email já existe
        const checkEmail = await User.find(req.body.email)
        if (checkEmail) {
            return res.status(400).json({ message: 'User already exists.' })
        }

        // checa se o telefone já existe
        const checkPhoneNumber = await User.find(req.body.phoneNumber)
        if (checkPhoneNumber) {
            return res.status(400).json({ message: 'User already exists.' })
        }

        // pega a senha e converte em hash
        const { password } = req.body;
        const hash = await bcrypt.hash(password, 8);

        // seta o 'role' do usuário
        req.body.role = 'user';

        // seta a senha para o hash
        req.body.password = hash;

        // cria o usuário
        const user = await User.create(req.body);

        return res.json(user)
    }
}

export default new UserController()