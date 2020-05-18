import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

import smtpConfig from '../config/Email';

import User from '../schemas/User';
import TFA from '../schemas/TFA';

class TwoFactorAuthController {
    public async create(req: Request, res: Response) {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            // se o email não existe, retorna erro
            return res.status(400).json({ description: `User not found.` });
        }

        // criando código de verificação
        const codigo = await Math.floor(100000 + Math.random() * 900000);

        const checkTFA = await TFA.findOne({ email });
        let tfa;

        if (checkTFA) {
            console.log('update', codigo);
            tfa = await checkTFA.update({ codigo });
            // tfa = await TFA.updateOne({ where: { email } }, { $set: { codigo } });
        } else {
            console.log('criou', codigo);
            tfa = await TFA.create({ email, codigo });
        }


        if (!tfa) {
            // se o email não existe, retorna erro
            return res.status(400).json({ description: `There was a problem creating a verification code.` });
        }

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: smtpConfig.smtpHost,
            port: smtpConfig.portSmtpServer,
            secure: smtpConfig.isStmpServerSecure, // true for 465, false for other ports
            auth: {
                user: smtpConfig.senderEmail, // generated ethereal user
                pass: smtpConfig.senderEmailPass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Fome de Cursos" <${smtpConfig.senderEmail}>`, // sender address
            to: `${email}`, // list of receivers
            subject: "Seu código de verificação", // Subject line
            text: `Seu código de verificação para fazer login é: ${codigo}`, // plain text body
            html: `Seu código de verificação para fazer login é: ${codigo}`, // html body
        });

        // console.log("Message sent: %s", info.messageId);
        return res.json({ message: `Email enviado com sucesso.` });
        // return res.json({ msg: `Success ${email} ${cod}` });
    }
}

export default new TwoFactorAuthController();