import { CreateInteractionDto } from '@/dtos/interaction.dtos';
import { RequestWithUserId } from '@/interfaces/auth.interface';
import { Interaction, InteractionType, TopContents } from '@/interfaces/interaction.interface';
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

  public getInteractionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const interactionId: string = req.params.id;
      const findInteractionData: Interaction = await this.interactionService.findInteractionById(interactionId);

      res.status(200).json({ data: findInteractionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getInteractionsOfContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contentId: string = req.params.contentId;
      const interactionsOfContent: Interaction[] = await this.interactionService.getInteractionsOfContent(contentId);

      res.status(200).json({
        reads: interactionsOfContent.filter(interaction => interaction.type === InteractionType.READ).length,
        likes: interactionsOfContent.filter(interaction => interaction.type === InteractionType.LIKE).length,
        data: interactionsOfContent,
        message: 'findInteractions',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTopContents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const interactionType: string = req.query.type?.toString() || InteractionType.READ;
      const topContents: TopContents[] = await this.interactionService.getTopContentsByInteractionType(interactionType);

      res.status(200).json({ data: { contentIds: topContents[0]?.contentIds || [] }, message: 'topContents' });
    } catch (error) {
      next(error);
    }
  };
}
