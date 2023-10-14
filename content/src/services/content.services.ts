import { CreateContentDto } from '@/dtos/content.dtos';
import { Content } from '@/interfaces/content.interface';
import contentModel from '@/models/content.model';

export class ContentService {
  public content = contentModel;

  public async createContent(contentData: CreateContentDto): Promise<Content> {}

  public async getContentById(contentId: string): Promise<Content> {}

  public async updateContent(contentId: string, contentData: CreateContentDto): Promise<Content> {}

  public async deleteContent(contentId: string): Promise<Content> {}

  public async getNewContent(): Promise<Content[]> {}

  public async getTopContent(): Promise<Content[]> {}

  public async uploadContentFromCsv(): Promise<Content[]> {}
}
