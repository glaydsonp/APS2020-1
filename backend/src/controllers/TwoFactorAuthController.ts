import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

import smtpConfig from '../config/Email';

class TwoFactorAuthController {
    public async create(req: Request, res: Response) {
        const { email } = req.body;

        console.log(__dirname);

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
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);

        return res.json({ msg: `Success ${email}` });
    }
}

export default new TwoFactorAuthController();