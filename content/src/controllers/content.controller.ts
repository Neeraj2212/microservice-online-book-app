import { CreateContentDto } from '@/dtos/content.dtos';
import { RequestWithUserId } from '@/interfaces/auth.interface';
import { Content, InteractionType } from '@/interfaces/content.interface';
import { ContentService } from '@/services/content.services';
import { NextFunction, Request, Response } from 'express';
import csv from 'csvtojson/v2';

export class ContentController {
  public contentService = new ContentService();

  public createContent = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const contentData: CreateContentDto = req.body;
      const userId: string = req.userId;
      const createContentData: Content = await this.contentService.createContent(userId, contentData);

      res.status(201).json({ data: createContentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getContentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contentId: string = req.params.id;
      const findOneContentData: Content = await this.contentService.getContentById(contentId);

      res.status(200).json({ data: findOneContentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateContent = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const contentId: string = req.params.id;
      const userId: string = req.userId;
      const contentData: CreateContentDto = req.body;
      const updateContentData: Content = await this.contentService.updateContent(contentId, userId, contentData);

      res.status(200).json({ data: updateContentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteContent = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const contentId: string = req.params.id;
      const userId: string = req.userId;
      const deleteContentData: Content = await this.contentService.deleteContent(contentId, userId);

      res.status(200).json({ data: deleteContentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getNewContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findNewContentData: Content[] = await this.contentService.getNewContent();

      res.status(200).json({ data: findNewContentData, message: 'findNew' });
    } catch (error) {
      next(error);
    }
  };

  public getTopContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sortBy: InteractionType = (req.query?.sortBy?.toString() as InteractionType) || InteractionType.READ;
      const findTopContentData: Content[] = await this.contentService.getTopContent(sortBy);

      res.status(200).json({ data: findTopContentData, message: 'findTop' });
    } catch (error) {
      next(error);
    }
  };

  public uploadContentFromCsv = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.userId;

      const jsonContentArray: Content[] = await csv().fromString(req.file.buffer.toString());

      jsonContentArray.forEach(content => {
        content.userId = userId;
      });

      const uploadedContent: Content[] = await this.contentService.uploadContentFromCsv(userId, jsonContentArray);

      res.status(200).json({ data: uploadedContent, message: 'upload' });
    } catch (error) {
      next(error);
    }
  };
}
