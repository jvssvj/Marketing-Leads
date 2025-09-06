import { Handler } from "express";
import { AddLeadRequestSchema } from "./schema/CampaignsRequestSchema";
import { GroupsLeadsService } from "../services/GroupsLeadsService";
export class GroupLeadsControllers {
  constructor(private readonly groupsLeadsService: GroupsLeadsService) {}

  getLeads: Handler = async (req, res, next) => {
    try {
      const result = await this.groupsLeadsService.getAllLeadsPaginated(req.params);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  addLead: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId);
      const { leadId } = AddLeadRequestSchema.parse(req.body);
      const updatedGroup = await this.groupsLeadsService.addLead(groupId, leadId);
      res.status(201).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  };

  removeLead: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId);
      const { leadId } = AddLeadRequestSchema.parse(req.body);
      const updatedGroup = await this.groupsLeadsService.removeLead(groupId, leadId);
      res.json(updatedGroup);
    } catch (error) {
      next(error);
    }
  };
}
