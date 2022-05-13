import { prisma } from "../prisma"
import { FeedbackRepository, FeedbackCreateData } from "../repositories/feedbacks-repository"

export class PrismaFeedbackRepository implements FeedbackRepository {
    async create({type, comment, screenshot}: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type, 
                comment, 
                screenshot
            }
        })
    }
}