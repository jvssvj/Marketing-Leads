import { LeadStatus, Prisma } from "@prisma/client";
import { GroupsRepository } from "../repositories/GroupsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

interface GetLeadsWithPaginationParams {
  page?: number;
  pageSize?: number;
  name?: string;
  status?: LeadStatus;
  sortBy?: "name";
  order?: "asc" | "desc";
}

export class GroupsLeadsService {
  constructor(private readonly groupsRepository: GroupsRepository, private readonly leadsRepository: LeadsRepository) {}
  async getAllLeadsPaginated(params: GetLeadsWithPaginationParams) {
    const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = params;

    const limit = Number(pageSize);
    const offset = (Number(page) - 1) * limit;

    const where: LeadWhereParams = {};

    if (name) where.name = { like: name, mode: "insensitive" };
    if (status) where.status = status;

    const leads = await this.leadsRepository.find({
      where,
      sortBy,
      order,
      limit,
      offset,
      include: {
        groups: true,
      },
    });

    const total = await this.leadsRepository.count(where);
    return {
      data: leads,
      meta: {
        page: page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async addLead(groupId: number, leadId: number) {
    return await this.groupsRepository.addLead(groupId, leadId);
  }

  async removeLead(groupId: number, leadId: number) {
    return await this.groupsRepository.removeLead(groupId, leadId);
  }
}
