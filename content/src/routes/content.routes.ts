import { ContentController } from '@/controllers/content.controller';
import { CreateContentDto, UpdateContentDto } from '@/dtos/content.dtos';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import multer from 'multer';

const upload = multer({});

export class ContentRoutes implements Routes {
  public controller = new ContentController();
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', authMiddleware, validationMiddleware(CreateContentDto, 'body'), this.controller.createContent);

    this.router.get('/new', this.controller.getNewContent);
    this.router.get('/top', this.controller.getTopContent);
    this.router.post('/upload', authMiddleware, upload.single('data'), this.controller.uploadContentFromCsv);

    this.router.get('/:id', this.controller.getContentById);
    this.router.put('/:id', authMiddleware, validationMiddleware(UpdateContentDto, 'body'), this.controller.updateContent);
    this.router.delete('/:id', authMiddleware, this.controller.deleteContent);
  }
}
