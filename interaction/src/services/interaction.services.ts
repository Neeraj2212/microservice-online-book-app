import { CreateInteractionDto } from '@/dtos/interaction.dtos';
import { HttpException } from '@/exceptions/HttpException';
import { Interaction } from '@/interfaces/interaction.interface';
import interactionModel from '@/models/interaction.model';

import { isEmpty } from 'class-validator';

export class InteractionService {
  public interaction = interactionModel;

  public async createInteraction(userId: string, interactionData: CreateInteractionDto): Promise<Interaction> {
    if (isEmpty(interactionData)) throw new HttpException(400, 'interactionData is empty');

    // It will find the interaction with the userId and contentId if not present then it will create a new one
    const createInteractionData: Interaction = await this.interaction.findOneAndUpdate(
      { ...interactionData, userId },
      { ...interactionData, userId },
      { upsert: true, new: true },
    );

    return createInteractionData;
  }

  public async getInterectionsByContentId(contentId: string): Promise<Interaction[]> {
    if (isEmpty(contentId)) throw new HttpException(400, 'contentId is empty');
    const interactions: Interaction[] = await this.interaction.find({ contentId });
    return interactions;
  }
}
