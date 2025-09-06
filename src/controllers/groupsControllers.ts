import { Handler } from "express";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schema/GroupsRequestSchema";
import { GroupsService } from "../services/GroupsService";

export class GroupsControllers {
  constructor(private readonly groupsService: GroupsService) {}

  index: Handler = async (req, res, next) => {
    try {
      const groups = await this.groupsService.findAllGroups();
      res.json(groups);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateGroupRequestSchema.parse(req.body);
      const newGroup = await this.groupsService.createGroup(body);
      res.json(newGroup);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const group = await this.groupsService.getGroup(+req.params.id);
      res.json(group);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const body = UpdateGroupRequestSchema.parse(req.body);
      const updatedGroup = await this.groupsService.updateGroup(+req.params.id, body);
      res.json(updatedGroup);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const deletedGroup = await this.groupsService.deletedGroup(+req.params.id);
      res.json(deletedGroup);
    } catch (error) {
      next(error);
    }
  };
}
