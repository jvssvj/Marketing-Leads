import { HttpError } from "../errors/HttpError";
import { CampaignsRepository, CreateCampaignAttributes } from "../repositories/CampaignsRepository";

export class CampaignsService {
  constructor(private readonly campaignsRepository: CampaignsRepository) {}

  async findAllCampaigns() {
    const campaigns = await this.campaignsRepository.find();
    if (!campaigns?.length) throw new HttpError(404, "No campaigns found.");
    return campaigns;
  }

  async getCampaign(campaignId: number) {
    const campaign = await this.campaignsRepository.findById(campaignId);
    if (!campaign) throw new HttpError(404, "Campaign not found.");
    return campaign;
  }

  async createCampaign(params: CreateCampaignAttributes) {
    const newCampaign = await this.campaignsRepository.create(params);
    return newCampaign;
  }

  async updateCampaign(campaignId: number, params: Partial<CreateCampaignAttributes>) {
    const updatedCampaign = await this.campaignsRepository.updateById(campaignId, params);
    if (!updatedCampaign) throw new HttpError(404, "Campaign not found.");
    return updatedCampaign;
  }

  async deleteCampaign(campaignId: number) {
    const deletedCampaign = await this.campaignsRepository.deleteById(campaignId);
    if (!deletedCampaign) throw new HttpError(404, "Campaign not found.");
    return deletedCampaign;
  }
}
