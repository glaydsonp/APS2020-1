import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import User from '../schemas/User';
import TFA from '../schemas/TFA';
import jwt from 'jsonwebtoken';
import authConfig from '../config/Auth';

class SessionController {
    public async create(req: Request, res: Response) {
        // pegando os dados do corpo da request
        const { email, password, codigo } = req.body;

        // verificando se o email existe no banco de dados
        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            // se o email não existe, retorna erro
            return res.status(400).json({ description: `User not found.` });
        }
        
        if (!codigo) {
            return res.status(400).json({ description: `Please inform the verification code.` });
        }

        const checkCodigo = await TFA.findOne({ email });
        console.log(checkCodigo);
        console.log(checkCodigo.codigo, typeof checkCodigo.codigo);
        console.log(codigo, typeof codigo);
        console.log(checkCodigo.codigo !== codigo);
        if (checkCodigo.codigo != codigo) {
            return res.status(400).json({ description: `The verification code does not match.` });
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
            return res.status(400).json({ description: `The password does not match.` });
        }
    }
}

export default new SessionController();