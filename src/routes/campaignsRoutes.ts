import { Router } from "express";
import { CampaignsControllers } from "../controllers/CampaignsControllers";
import { PrismaCampaignsRepository } from "../repositories/prisma/PrismaCampaignsRepository";
import { CampaignsService } from "../services/CampaignsService";

const campaignsRoutes = Router();
const campaignsRepository = new PrismaCampaignsRepository();
const capaignsService = new CampaignsService(campaignsRepository);
const campaignsController = new CampaignsControllers(capaignsService);

campaignsRoutes.get("/campaigns", campaignsController.index);
campaignsRoutes.post("/campaigns", campaignsController.create);
campaignsRoutes.get("/capaigns/:id", campaignsController.show);
campaignsRoutes.put("/campaigns/:id", campaignsController.update);
campaignsRoutes.delete("/campaigns/:id", campaignsController.delete);

export { campaignsRoutes };
