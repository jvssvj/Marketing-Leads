import { Router } from "express";
import { GroupsControllers } from "../controllers/GroupsControllers";
import { PrismaGroupsRepository } from "../repositories/prisma/PrismaGroupsRepository";
import { GroupsService } from "../services/GroupsService";

const groupsRoutes = Router();
const groupsRepository = new PrismaGroupsRepository();
const groupsService = new GroupsService(groupsRepository);
const groupsControllers = new GroupsControllers(groupsService);

groupsRoutes.get("/groups", groupsControllers.index);
groupsRoutes.post("/groups", groupsControllers.create);
groupsRoutes.get("/groups/:id", groupsControllers.show);
groupsRoutes.put("/groups/:id", groupsControllers.update);
groupsRoutes.delete("/groups/:id", groupsControllers.delete);

export { groupsRoutes };
