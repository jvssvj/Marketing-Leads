import { Router } from "express";

import { PrismaCampaignsRepository } from "../repositories/prisma/PrismaCampaignsRepository";
import { PrismaLeadsRepository } from "../repositories/prisma/PrismaLeadsRepository";
import { CampaignLeadsController } from "../controllers/CampaignsLeadsControllers";
import { CampaignsLeadsService } from "../services/CampaignsLeadsService";

const campaignsLeadsRoutes = Router();
const leadsRepository = new PrismaLeadsRepository();
const campaignsRepository = new PrismaCampaignsRepository();
const campaignsLeadsService = new CampaignsLeadsService(campaignsRepository, leadsRepository);
const campaignsLeadsControllers = new CampaignLeadsController(campaignsLeadsService);

campaignsLeadsRoutes.get("/campaigns/:campaignId/leads", campaignsLeadsControllers.getLeads);
campaignsLeadsRoutes.post("/campaigns/:campaignId/leads", campaignsLeadsControllers.addLead);
campaignsLeadsRoutes.put("/campaigns/:campaignId/leads/:leadId", campaignsLeadsControllers.updateLeadStatus);
campaignsLeadsRoutes.delete("/campaigns/:campaignId/leads/:leadId", campaignsLeadsControllers.removeLead);

export { campaignsLeadsRoutes };
