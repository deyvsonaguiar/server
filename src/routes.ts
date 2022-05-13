import { PrismaFeedbackRepository } from './prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from "express"
import nodemailer from 'nodemailer'

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a03e73388c8f59",
      pass: "1c3031709a1852"
    }
    })

routes.post('/feedbacks',async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository)

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    //envio de email com mailtrap
/*  await transport.sendMail({
        from: 'Equipe Feedget <atendimento@feedget.com',
        to: 'Deyvson Aguiar <deyvsonaguiar@gmail.com',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo de comentário: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
        ].join('\n')
    })
*/

    return res.status(201).send()
})