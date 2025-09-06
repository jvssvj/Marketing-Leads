import { CampaignsRepository, LeadCampaignStatus } from "../repositories/CampaignsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

interface GetLeadsWithPaginationParams {
  page?: string;
  pageSize?: string;
  name?: string;
  status?: LeadCampaignStatus;
  sortBy?: "name" | "createdAt";
  order?: "asc" | "desc";
}

export class CampaignsLeadsService {
  constructor(
    private readonly campaignsRepository: CampaignsRepository,
    private readonly leadsRepository: LeadsRepository
  ) {}

  async getAllLeadsPaginated(campaignId: number, params: GetLeadsWithPaginationParams) {
    const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = params;

    const limit = Number(pageSize);
    const offset = (Number(page) - 1) * limit;

    const where: LeadWhereParams = { campaignId, campaignStatus: status };

    if (name) where.name = { like: name, mode: "insensitive" };

    const leads = await this.leadsRepository.find({
      where,
      sortBy,
      order,
      limit,
      offset,
      include: { campaigns: true },
    });

    const total = await this.leadsRepository.count(where);

    return {
      data: leads,
      meta: {
        page: page,
        pageSize: pageSize,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async addLead(campaignId: number, leadId: number, status: LeadCampaignStatus) {
    return await this.campaignsRepository.addLead({
      campaignId,
      leadId,
      status,
    });
  }

  async updateLeadStatus(campaignId: number, leadId: number, status: LeadCampaignStatus) {
    await this.campaignsRepository.updateLeadStatus({
      campaignId,
      leadId,
      status,
    });
  }

  async removeLead(campaignId: number, leadId: number) {
    return await this.campaignsRepository.removeLead(campaignId, leadId); //De onde vem a validação?
  }
}
