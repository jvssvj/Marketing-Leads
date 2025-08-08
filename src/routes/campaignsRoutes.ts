import { Router } from "express";
import { CampaignsController } from "../controllers/campaignsControllers";

const campaignsRoutes = Router()
const campaignsController = new CampaignsController()

campaignsRoutes.get('/campaigns', campaignsController.index)
campaignsRoutes.post('/campaigns', campaignsController.create)
campaignsRoutes.get('/capaigns/:id', campaignsController.show)
campaignsRoutes.put('/campaigns/:id', campaignsController.update)
campaignsRoutes.delete('/campaigns/:id', campaignsController.delete)

export { campaignsRoutes }