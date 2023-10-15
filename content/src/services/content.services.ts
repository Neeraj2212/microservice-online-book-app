import { INTERACTION_SERVICE_URL } from '@/config';
import { CreateContentDto, UpdateContentDto } from '@/dtos/content.dtos';
import { HttpException } from '@/exceptions/HttpException';
import { Content, InteractionType } from '@/interfaces/content.interface';
import contentModel from '@/models/content.model';
import axios from 'axios';
import { isEmpty } from 'class-validator';
import { isValidObjectId } from 'mongoose';

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
    if (!isValidObjectId(contentId)) throw new HttpException(400, 'contentId is invalid');

    const findContent: Content = await this.content.findOne({ _id: contentId });
    if (!findContent) throw new HttpException(404, `Content does not exists`);

    return findContent;
  }

  public async updateContent(contentId: string, userId: string, contentData: UpdateContentDto): Promise<Content> {
    if (isEmpty(contentData)) throw new HttpException(400, 'contentData is empty');
    if (isEmpty(contentId)) throw new HttpException(400, 'contentId is empty');

    const storedContent: Content = await this.content.findById(contentId);

    if (!storedContent) throw new HttpException(404, `Content does not exists`);

    if (storedContent.userId.toString() !== userId) throw new HttpException(409, `You're not owner of this content`);

    const updatedContent: Content = await this.content.findByIdAndUpdate(contentId, { $set: contentData }, { returnOriginal: false });

    return updatedContent;
  }

  public async deleteContent(contentId: string, userId: string): Promise<Content> {
    if (isEmpty(contentId)) throw new HttpException(400, 'contentId is empty');
    if (!isValidObjectId(contentId)) throw new HttpException(400, 'contentId is invalid');

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

  public async getTopContent(sortBy: InteractionType): Promise<Content[]> {
    const topContents: Content[] = [];

    // Get top interacted contents from interection service
    const topContentIds: { contentIds: string[] } = await axios
      .get(`${INTERACTION_SERVICE_URL}/top`, { params: { type: sortBy } })
      .then(res => res.data.data);

    // Get top contents from the db
    for (const contentId of topContentIds.contentIds) {
      const content: Content = await this.content.findById(contentId);
      topContents.push(content);
    }

    // Get Other contents from the db
    const otherContents: Content[] = await this.content.find({ _id: { $nin: topContentIds.contentIds } }).sort({ datePublished: -1 });

    return [...topContents, ...otherContents];
  }

  public async uploadContentFromCsv(userId: string, content: Content[]): Promise<Content[]> {
    if (isEmpty(content)) throw new HttpException(400, 'content is empty');

    const createContentData: Content[] = await this.content.create(content);

    return createContentData;
  }
}
