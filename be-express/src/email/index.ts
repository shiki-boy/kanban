import nodemailer from "nodemailer";
import { MAIL_HOST, SMTP_PORT } from '@config'

const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(SMTP_PORT),
});

export default transporter