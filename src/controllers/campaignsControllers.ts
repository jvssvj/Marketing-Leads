import { Handler } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schema/CampaignsRequestSchema";

export class CampaignsController {
    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await prisma.campaign.findMany()
            if (campaigns.length === 0 || !campaigns) throw new HttpError(404, "No campaigns found.")
            res.json(campaigns)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignRequestSchema.parse(req.body)
            const newCampaign = await prisma.campaign.create({ data: body })
            res.json(newCampaign)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaign = await prisma.campaign.findUnique({
                where: { id: Number(req.params.id) },
                include: {
                    leads: {
                        include: {
                            lead: true
                        }
                    }
                }
            })

            if (!campaign) throw new HttpError(404, "Campaign not found.")
            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateCampaignRequestSchema.parse(req.body)

            const campaign = await prisma.campaign.findUnique({ where: { id: Number(req.params.id) } })
            if (!campaign) throw new HttpError(404, "Campaign not found.")

            const updatedCampaign = await prisma.campaign.update({ where: { id: Number(req.params.id) }, data: body })

            res.json(updatedCampaign)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const campaign = await prisma.campaign.findUnique({ where: { id: Number(req.params.id) } })
            if (!campaign) throw new HttpError(404, "Campaign not found.")

            const deletedCampaign = await prisma.campaign.delete({ where: { id: Number(req.params.id) } })
            res.json(deletedCampaign)
        } catch (error) {
            next(error)
        }
    }
}