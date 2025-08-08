import { Handler } from "express";
import { prisma } from "../database";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./schema/LeadRequestSchema";
import { HttpError } from "../errors/HttpError";
import { Prisma } from "@prisma/client";

export class LeadsController {
    index: Handler = async (req, res, next) => {
        try {
            const query = GetLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const pageNumber = Number(page)
            const pageSizeNumber = Number(pageSize)
            const where: Prisma.LeadWhereInput = {}

            if (name) where.name = { contains: name, mode: "insensitive" }
            if (status) where.status = status


            const leads = await prisma.lead.findMany({
                where,
                skip: (pageNumber - 1) * pageSizeNumber,
                take: pageSizeNumber,
                orderBy: { [sortBy]: order }
            })

            const total = await prisma.lead.count({ where })
            if (total === 0) throw new HttpError(404, 'No leads found.')

            res.json({
                data: leads,
                meta: {
                    page: pageNumber,
                    pageSize: pageSizeNumber,
                    total,
                    totalPages: Math.ceil(total / pageSizeNumber)
                }
            })

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

            const body = UpdateLeadRequestSchema.parse(req.body)

            const leadUpdated = await prisma.lead.update({
                where: { id },
                data: body
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