import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import User from '../schemas/User';
import jwt from 'jsonwebtoken';
import authConfig from '../config/Auth';

class SessionController {
    public async create(req: Request, res: Response) {
        // pegando os dados do corpo da request
        const { email, password } = req.body;

        // verificando se o email existe no banco de dados
        const checkUser = await User.findOne({ email });
        console.log(checkUser);
        if (!checkUser) {
            // se o email não existe, retorna erro
            return res.status(400).json({ message: `User not found.` });
        }

        // verifica senha
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (checkPassword) {
            // usuário logado
            const { id, name } = checkUser;

            // criando a data de expiração
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
        } else {
            // senha errada
            return res.status(400).json({ message: `The password does not match.` });
        }
    }
}

export default new SessionController();