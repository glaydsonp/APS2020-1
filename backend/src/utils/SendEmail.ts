import nodemailer from 'nodemailer';

import smtpConfig from '../config/Email';
import TFA from '../schemas/TFA';

export const SendEmail = async (email: string) => {
    const codigo = await Math.floor(100000 + Math.random() * 900000);

    const checkTFA = await TFA.findOne({ email });
    if (checkTFA) {
        await checkTFA.updateOne({ codigo });
    } else {
        await TFA.create({ email, codigo });
    }

    let transporter = nodemailer.createTransport({
        host: smtpConfig.smtpHost,
        port: smtpConfig.portSmtpServer,
        secure: smtpConfig.isStmpServerSecure,
        auth: {
            user: smtpConfig.senderEmail,
            pass: smtpConfig.senderEmailPass,
        },
    });

    let info = await transporter.sendMail({
        from: `"Fome de Cursos" <${smtpConfig.senderEmail}>`,
        to: `${email}`,
        subject: "Seu código de verificação",
        text: `Seu código de verificação para fazer login é: ${codigo}`,
        html: `Seu código de verificação para fazer login é: ${codigo}`,
    });
}