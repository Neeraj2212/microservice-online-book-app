import { InteractionController } from '@/controllers/interaction.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class InteractionRoutes implements Routes {
  public controller = new InteractionController();
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', authMiddleware, this.controller.createInteraction);
    // For internal use by content service
    this.router.get('/top', this.controller.getTopContents);
    this.router.get('/content/:contentId', this.controller.getInteractionsOfContent);
    this.router.get('/:id', this.controller.getInteractionById);
  }
}
