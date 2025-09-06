import { HttpError } from "../errors/HttpError";
import { CreateGroupAttributes, GroupsRepository } from "../repositories/GroupsRepository";

export class GroupsService {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async findAllGroups() {
    const groups = await this.groupsRepository.find();
    if (groups.length === 0) throw new HttpError(404, "No groups found.");
    return groups;
  }

  async createGroup(params: CreateGroupAttributes) {
    const newGroup = await this.groupsRepository.create(params);
    return newGroup;
  }

  async getGroup(groudId: number) {
    const group = await this.groupsRepository.findById(groudId);
    if (!group) throw new HttpError(404, "Group not found.");
    return group;
  }

  async updateGroup(groudId: number, params: Partial<CreateGroupAttributes>) {
    const updatedGroup = await this.groupsRepository.updateById(groudId, params);
    if (!updatedGroup) throw new HttpError(404, "Group not found.");
    return updatedGroup;
  }

  async deletedGroup(groudId: number) {
    const deletedGroup = await this.groupsRepository.deleteById(groudId);
    if (!deletedGroup) throw new HttpError(404, "Group not found.");
    return deletedGroup;
  }
}
