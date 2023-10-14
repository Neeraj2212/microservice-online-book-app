import { ContentController } from '@/controllers/content.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class ContentRoutes implements Routes {
  public controller = new ContentController();
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.controller.createContent);

    this.router.get('/:id', this.controller.getContentById);
    this.router.put('/:id', this.controller.updateContent);
    this.router.delete('/:id', this.controller.deleteContent);

    this.router.get('/new', this.controller.getNewContent);
    this.router.get('/top', this.controller.getTopContent);

    this.router.post('/upload', this.controller.uploadContentFromCsv);
  }
}
