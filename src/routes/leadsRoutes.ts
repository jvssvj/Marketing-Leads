import { Router } from "express";
import { LeadsControllers } from "../controllers/LeadsControllers";
import { PrismaLeadsRepository } from "../repositories/prisma/PrismaLeadsRepository";

const leadsRoutes = Router()
const leadsRepository = new PrismaLeadsRepository()
const leadsControllers = new LeadsControllers(leadsRepository)

leadsRoutes.get('/leads', leadsControllers.index)
leadsRoutes.post('/leads', leadsControllers.create)
leadsRoutes.get('/leads/:id', leadsControllers.show)
leadsRoutes.put('/leads/:id', leadsControllers.update)
leadsRoutes.delete('/leads/:id', leadsControllers.delete)

export { leadsRoutes }