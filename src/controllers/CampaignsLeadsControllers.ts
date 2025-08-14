import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schema/CampaignsRequestSchema";
import { Prisma } from "@prisma/client";
import { prisma } from "../database";

export class CampaignsLeadsControllers {
    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.id)
            const query = GetCampaignLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const pageNumber = Number(page)
            const pageSizeNumber = Number(pageSize)

            const where: Prisma.LeadWhereInput = {
                campaigns: {
                    some: { campaignId }
                }
            }

            if (name) where.name = { contains: name, mode: "insensitive" }
            if (status) where.campaigns = { some: { status } }

            const leads = await prisma.lead.findMany({
                where,
                orderBy: { [sortBy]: order },
                skip: (pageNumber - 1) * pageSizeNumber,
                take: pageSizeNumber,
                include: {
                    campaigns: {
                        select: {
                            campaignId: true,
                            leadId: true,
                            status: true
                        }
                    }
                }
            })

            const total = await prisma.lead.count({ where })

            res.json({
                leads,
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

    addLead: Handler = async (req, res, next) => {
        try {
            const body = AddLeadRequestSchema.parse(req.body)
            await prisma.leadCampaign.create({
                data: {
                    campaignId: Number(req.params.campaignId),
                    leadId: body.leadId,
                    status: body.status
                }
            })
            res.status(201).end()
        } catch (error) {
            next(error)
        }
    }

    UpdateLeadStatus: Handler = async (req, res, next) => {
        try {
            const body = UpdateLeadStatusRequestSchema.parse(req.body)
            const updateLeadCampaign = await prisma.leadCampaign.update({
                data: body,
                where: {
                    leadId_campaignId: {
                        campaignId: Number(req.params.id),
                        leadId: Number(req.params.id)
                    }
                }
            })
            res.json(updateLeadCampaign)
        } catch (error) {
            next(error)
        }
    }

    removeLead: Handler = async (req, res, next) => {
        try {
            const removeLead = await prisma.leadCampaign.delete({
                where: {
                    leadId_campaignId: {
                        campaignId: Number(req.params.campaignId),
                        leadId: Number(req.params.leadId)
                    }
                }
            })
            res.json({ removeLead })
        } catch (error) {
            next(error)
        }
    }
}