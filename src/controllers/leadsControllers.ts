import { Handler } from "express";
import { prisma } from "../database";
import { CreateLeadRequestSchema } from "./schema/CreateLeadRequestSchema";
import { HttpError } from "../errors/HttpError";
import z from "zod";

export class LeadsController {
    index: Handler = async (req, res, next) => {
        try {
            const leads = await prisma.lead.findMany()
            if (leads.length === 0 || !leads) throw new HttpError(404, 'No leads found.')
            res.json(leads)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSchema.parse(req.body)
            const newLead = await prisma.lead.create({
                data: body
            })
            res.json(newLead)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const lead = await prisma.lead.findUnique({
                where: { id },
                include: {
                    groups: true,
                    campaigns: true
                }
            })

            if (!lead) throw new HttpError(404, 'Lead not found.')

            res.json(lead)
        } catch (error) {
            next(error)
        }
    }


    update: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)

            const lead = await prisma.lead.findUnique({ where: { id } })
            if (!lead) throw new HttpError(404, 'Lead not found.')

            const UpdateLeadSchema = z.object({
                name: z.string().min(2).optional(),
                email: z.email().optional(),
                status: z.enum(['New', 'Qualified', 'Archived']).optional()
            })

            const data = UpdateLeadSchema.parse(req.body)

            const leadUpdated = await prisma.lead.update({
                where: { id },
                data
            })

            res.json(leadUpdated)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const lead = await prisma.lead.findUnique({ where: { id } })
            if (!lead) throw new HttpError(404, 'Lead not found.')

            const leadDeleted = await prisma.lead.delete({ where: { id } })
            res.json(leadDeleted)
        } catch (error) {
            next(error)
        }
    }
}