import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const app = express()
app.use(express.json())


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a03e73388c8f59",
      pass: "1c3031709a1852"
    }
  })

app.post('/feedbacks',async (req, res) => {
    const { type, comment, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type, 
            comment, 
            screenshot
        }
    })

    transport.sendMail({
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

    return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
    console.log('HTTP Server is running!')
})

