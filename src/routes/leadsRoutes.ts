import { Router } from "express";
import { LeadsControllers } from "../controllers/LeadsControllers";
import { PrismaLeadsRepository } from "../repositories/prisma/PrismaLeadsRepository";
import { LeadsService } from "../services/LeadsService";

const leadsRoutes = Router();
const leadsRepository = new PrismaLeadsRepository();
const leadsService = new LeadsService(leadsRepository);
const leadsControllers = new LeadsControllers(leadsService);

leadsRoutes.get("/leads", leadsControllers.index);
leadsRoutes.post("/leads", leadsControllers.create);
leadsRoutes.get("/leads/:id", leadsControllers.show);
leadsRoutes.put("/leads/:id", leadsControllers.update);
leadsRoutes.delete("/leads/:id", leadsControllers.delete);

export { leadsRoutes };
