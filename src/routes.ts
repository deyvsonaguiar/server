import { NodemailerMailAdapter } from './adapter/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from "express"
import nodemailer from 'nodemailer'

export const routes = express.Router()

routes.post('/feedbacks',async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailAdapter
        )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send()
})