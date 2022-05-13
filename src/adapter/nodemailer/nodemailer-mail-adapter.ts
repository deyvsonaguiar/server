import { MailAdapter, SendMailData } from './../mail-adapter';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a03e73388c8f59",
        pass: "1c3031709a1852"
    }
})


export class NodemailerMailAdapter implements MailAdapter {
   async sendMail({subject, body}: SendMailData) {

    await transport.sendMail({
        from: 'Equipe Feedget <atendimento@feedget.com',
        to: 'Deyvson Aguiar <deyvsonaguiar@gmail.com',
        subject,
        html: body
    })

   };
}