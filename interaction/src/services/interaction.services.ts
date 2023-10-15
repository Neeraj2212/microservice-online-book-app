import { CreateInteractionDto } from '@/dtos/interaction.dtos';
import { HttpException } from '@/exceptions/HttpException';
import { Interaction, TopContents } from '@/interfaces/interaction.interface';
import interactionModel from '@/models/interaction.model';

import { isEmpty } from 'class-validator';
import { isValidObjectId } from 'mongoose';

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

  public async findInteractionById(interactionId: string): Promise<Interaction> {
    if (isEmpty(interactionId)) throw new HttpException(400, 'interactionId is empty');
    if (!isValidObjectId(interactionId)) throw new HttpException(400, 'interactionId is invalid');

    const findInteractionData: Interaction = await this.interaction.findOne({ _id: interactionId });
    if (!findInteractionData) throw new HttpException(409, "Interaction doesn't exist");

    return findInteractionData;
  }

  public async getInteractionsOfContent(contentId: string): Promise<Interaction[]> {
    if (isEmpty(contentId)) throw new HttpException(400, 'contentId is empty');
    if (!isValidObjectId(contentId)) throw new HttpException(400, 'contentId is invalid');

    const contentInteractions: Interaction[] = await this.interaction.find({ contentId });

    return contentInteractions;
  }

  // For internal use by content service
  public async getTopContentsByInteractionType(interactionType: string): Promise<TopContents[]> {
    if (isEmpty(interactionType)) throw new HttpException(400, 'interactionType is empty');

    const topContents: TopContents[] = await this.interaction.aggregate(
      [
        {
          $group: {
            _id: '$contentId',
            sortField: {
              $sum: {
                $cond: [{ $eq: ['$type', interactionType] }, 1, 0],
              },
            },
          },
        },
        { $sort: { sortField: -1 } },
        { $project: { sortField: 0 } },
        {
          $group: {
            _id: null,
            contentIds: { $push: '$_id' },
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true },
    );

    return topContents;
  }
}
