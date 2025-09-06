import { Handler } from "express";
import {
  AddLeadRequestSchema,
  GetCampaignLeadsRequestSchema,
  UpdateLeadStatusRequestSchema,
} from "./schema/CampaignsRequestSchema";
import { CampaignsLeadsService } from "../services/CampaignsLeadsService";
export class CampaignLeadsController {
  constructor(private readonly campaignsLeadsService: CampaignsLeadsService) {}

  getLeads: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId);
      const query = GetCampaignLeadsRequestSchema.parse(req.query);
      const result = await this.campaignsLeadsService.getAllLeadsPaginated(campaignId, query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  addLead: Handler = async (req, res, next) => {
    try {
      const campaignId = Number(req.params.campaignId);
      const { leadId, status = "New" } = AddLeadRequestSchema.parse(req.body);
      await this.campaignsLeadsService.addLead(campaignId, leadId, status);
      res.status(201).end();
    } catch (error) {
      next(error);
    }
  };

  updateLeadStatus: Handler = async (req, res, next) => {
    try {
      const { status } = UpdateLeadStatusRequestSchema.parse(req.body);
      const updatedLead = await this.campaignsLeadsService.updateLeadStatus(
        +req.params.campaignId,
        +req.params.leadId,
        status
      );
      res.json({
        message: "Status do lead atualizado com sucesso.",
        data: updatedLead,
      });
    } catch (error) {
      next(error);
    }
  };

  removeLead: Handler = async (req, res, next) => {
    try {
      await this.campaignsLeadsService.removeLead(+req.params.campaignId, +req.params.leadId);
      res.json({ message: "lead removido da campanha com sucesso." });
    } catch (error) {
      next(error);
    }
  };
}
