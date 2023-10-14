import { CreateContentDto } from '@/dtos/content.dtos';
import { Content } from '@/interfaces/content.interface';
import { ContentService } from '@/services/content.services';
import { NextFunction, Request, Response } from 'express';

export class ContentController {
  public contentService = new ContentService();

  public createContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contentData: CreateContentDto = req.body;
      const createContentData: Content = await this.contentService.createContent(contentData);

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

  public updateContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contentId: string = req.params.id;
      const contentData: CreateContentDto = req.body;
      const updateContentData: Content = await this.contentService.updateContent(contentId, contentData);

      res.status(200).json({ data: updateContentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contentId: string = req.params.id;
      const deleteContentData: Content = await this.contentService.deleteContent(contentId);

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
      const findTopContentData: Content[] = await this.contentService.getTopContent();

      res.status(200).json({ data: findTopContentData, message: 'findTop' });
    } catch (error) {
      next(error);
    }
  };

  public uploadContentFromCsv = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uploadContentData: Content[] = await this.contentService.uploadContentFromCsv();

      res.status(200).json({ data: uploadContentData, message: 'upload' });
    } catch (error) {
      next(error);
    }
  };
}
