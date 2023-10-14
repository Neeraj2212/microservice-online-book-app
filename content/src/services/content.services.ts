import { CreateContentDto, updateContentDto } from '@/dtos/content.dtos';
import { HttpException } from '@/exceptions/HttpException';
import { Content } from '@/interfaces/content.interface';
import contentModel from '@/models/content.model';
import { isEmpty } from 'class-validator';

export class ContentService {
  public content = contentModel;

  public async createContent(userId: string, contentData: CreateContentDto): Promise<Content> {
    if (isEmpty(contentData)) throw new HttpException(400, 'contentData is empty');

    const findContent = await this.content.findOne({ title: contentData.title });
    if (findContent) throw new HttpException(409, `This content with title ${contentData.title} already exists`);

    const createContentData: Content = await this.content.create({ ...contentData, userId });

    return createContentData;
  }

  public async getContentById(contentId: string): Promise<Content> {
    if (isEmpty(contentId)) throw new HttpException(400, 'contentId is empty');

    const findContent: Content = await this.content.findOne({ _id: contentId });
    if (!findContent) throw new HttpException(404, `Content does not exists`);

    return findContent;
  }

  public async updateContent(contentId: string, userId: string, contentData: updateContentDto): Promise<Content> {
    if (isEmpty(contentData)) throw new HttpException(400, 'contentData is empty');

    const storedContent: Content = await this.content.findById(contentId);

    if (!storedContent) throw new HttpException(404, `Content does not exists`);

    if (storedContent.userId.toString() !== userId) throw new HttpException(409, `You're not owner of this content`);

    const updatedContent: Content = await this.content.findByIdAndUpdate(contentId, { $set: contentData }, { returnOriginal: false });

    return updatedContent;
  }

  public async deleteContent(contentId: string, userId: string): Promise<Content> {
    if (isEmpty(contentId)) throw new HttpException(400, 'contentId is empty');

    const storedContent: Content = await this.content.findById(contentId);
    if (!storedContent) throw new HttpException(404, `Content does not exists`);

    if (storedContent.userId.toString() !== userId) throw new HttpException(409, `You're not owner of this content`);

    const deletedContent: Content = await this.content.findByIdAndDelete(contentId);

    return deletedContent;
  }

  public async getNewContent(): Promise<Content[]> {
    const newContent: Content[] = await this.content.find().sort({ datePublished: -1 });
    return newContent;
  }

  // TODO: GET CONTENT STATS FROM INTERACTIONS AND SEND UPDATED CONTENT
  public async getTopContent(): Promise<Content[]> {
    return null;
  }

  public async uploadContentFromCsv(userId: string, content: Content[]): Promise<Content[]> {
    if (isEmpty(content)) throw new HttpException(400, 'content is empty');

    const createContentData: Content[] = await this.content.create(content);

    return createContentData;
  }
}
