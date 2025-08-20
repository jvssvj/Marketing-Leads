import { Router } from "express";
import { GroupLeadsControllers } from "../controllers/GroupLeadsControllers";



const groupsLeadsRoutes = Router()
const groupLeadsControllers = new GroupLeadsControllers()

groupsLeadsRoutes.get('/groups/:groupId/leads', groupLeadsControllers.getLeads)
groupsLeadsRoutes.post('/groups/:groupId/leads', groupLeadsControllers.addLead)
groupsLeadsRoutes.post('/groups/:groupId/leads/leadId', groupLeadsControllers.removeLead)

export { groupsLeadsRoutes }