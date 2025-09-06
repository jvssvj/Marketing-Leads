import { Handler } from "express";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schema/CampaignsRequestSchema";
import { CampaignsService } from "../services/CampaignsService";

export class CampaignsControllers {
  constructor(private readonly campaignsService: CampaignsService) {}
  index: Handler = async (req, res, next) => {
    try {
      const campaigns = await this.campaignsService.findAllCampaigns();
      res.json(campaigns);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const campaign = await this.campaignsService.getCampaign(+req.params.id);
      res.json(campaign);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateCampaignRequestSchema.parse(req.body);
      const newCampaign = await this.campaignsService.createCampaign(body);
      res.json(newCampaign);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const body = UpdateCampaignRequestSchema.parse(req.body);
      const updatedCampaign = await this.campaignsService.updateCampaign(+req.params.id, body);
      res.json(updatedCampaign);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const deletedCampaign = await this.campaignsService.deleteCampaign(+req.params.id);
      res.json(deletedCampaign);
    } catch (error) {
      next(error);
    }
  };
}
