import { Router } from "express";
import { CampaignsLeadsControllers } from "../controllers/CampaignsLeadsControllers";

const campaignsLeadsRoutes = Router()
const campaignsLeadsControllers = new CampaignsLeadsControllers()

campaignsLeadsRoutes.get('/campaigns/:campaignId/leads', campaignsLeadsControllers.getLeads)
campaignsLeadsRoutes.post('/campaigns/:campaignId/leads', campaignsLeadsControllers.addLead)
campaignsLeadsRoutes.put('/campaigns/:campaignId/leads/:leadId', campaignsLeadsControllers.UpdateLeadStatus)
campaignsLeadsRoutes.delete('/campaigns/:campaignId/leads/:leadId', campaignsLeadsControllers.removeLead)

export { campaignsLeadsRoutes }