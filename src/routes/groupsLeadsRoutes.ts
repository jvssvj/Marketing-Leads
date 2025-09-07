import { Router } from "express";
import { GroupLeadsControllers } from "../controllers/GroupLeadsControllers";
import { PrismaGroupsRepository } from "../repositories/prisma/PrismaGroupsRepository";
import { PrismaLeadsRepository } from "../repositories/prisma/PrismaLeadsRepository";
import { GroupsLeadsService } from "../services/GroupsLeadsService";

const groupsLeadsRoutes = Router();
const groupsRepository = new PrismaGroupsRepository();
const leadsRepository = new PrismaLeadsRepository();
const groupLeadsService = new GroupsLeadsService(groupsRepository, leadsRepository);
const groupLeadsControllers = new GroupLeadsControllers(groupLeadsService);

groupsLeadsRoutes.get("/groups/:groupId/leads", groupLeadsControllers.getLeads);
groupsLeadsRoutes.post("/groups/:groupId/leads", groupLeadsControllers.addLead);
groupsLeadsRoutes.delete("/groups/:groupId/leads/leadId", groupLeadsControllers.removeLead);

export { groupsLeadsRoutes };
