import { Request, Response } from 'express'
import bcrypt from 'bcrypt';

import User from '../schemas/User'

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const users = await User.find();

        return res.json(users)
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, phoneNumber, password } = req.body

        // checa se o email já existe
        const checkEmail = await User.find({ email })
        if (checkEmail && checkEmail.length > 0) {
            return res.status(400).json({ message: 'Email already exists.' })
        }

        // checa se o telefone já existe
        const checkPhoneNumber = await User.find({ phoneNumber })
        if (checkPhoneNumber && checkPhoneNumber.length > 0) {
            return res.status(400).json({ message: 'Phone number already exists.' })
        }

        // pega a senha e converte em hash
        const hash = await bcrypt.hash(password, 8);

        // seta o 'role' do usuário
        const role = 'user';

        // cria o usuário
        const user = {
            name,
            email,
            phoneNumber,
            password: hash,
            role
        }

        // persiste no banco
        const { id } = await User.create(user);

        if (id) {
            // se persistiu, retorna o usuário
            return res.json({
                id,
                name,
                email,
                phoneNumber
            })
        } else {
            // se não persistiu, retorna erro
            return res.status(400).json({
                message: 'Error on user create.'
            })
        }

    }
}

export default new UserController()