import { CreateInteractionDto } from '@/dtos/interaction.dtos';
import { RequestWithUserId } from '@/interfaces/auth.interface';
import { Interaction } from '@/interfaces/interaction.interface';
import { InteractionService } from '@/services/interaction.services';
import { NextFunction, Request, Response } from 'express';

export class InteractionController {
  public interactionService = new InteractionService();

  public createInteraction = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
      const interactionData: CreateInteractionDto = req.body;
      const userId: string = req.userId;
      const createInteractionData: Interaction = await this.interactionService.createInteraction(userId, interactionData);

      res.status(201).json({ data: createInteractionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getInteractionByContentId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contentId: string = req.params.contentId;
      const findInteractions: Interaction[] = await this.interactionService.getInterectionsByContentId(contentId);

      res.status(200).json({
        data: {
          reads: findInteractions.filter(interaction => interaction.type === 'read').length,
          likes: findInteractions.filter(interaction => interaction.type === 'like').length,
        },
        message: 'findInteractions',
      });
    } catch (error) {
      next(error);
    }
  };
}
