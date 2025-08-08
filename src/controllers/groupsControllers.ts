import { Handler } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schema/GroupsRequestSchema";

export class GroupsControllers {
    index: Handler = async (req, res, next) => {
        try {
            const groups = await prisma.group.findMany()
            if (groups.length === 0) throw new HttpError(404, "No groups found.")
            res.json(groups)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body)
            const newGroup = await prisma.group.create({ data: body })

            res.json(newGroup)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const group = await prisma.group.findUnique({ where: { id } })
            if (!group) throw new HttpError(404, "Group not found.")

            res.json(group)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateGroupRequestSchema.parse(req.body)
            const id = Number(req.params.id)

            const group = await prisma.group.findUnique({ where: { id } })
            if (!group) throw new HttpError(404, "Group not found.")

            const updatedGroup = await prisma.group.update({
                where: { id },
                data: body
            })

            res.json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)
            const group = await prisma.group.findUnique({ where: { id } })
            if (!group) throw new HttpError(404, "Group not found.")

            res.json(group)
        } catch (error) {
            next(error)
        }
    }
}