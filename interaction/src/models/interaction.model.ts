import { Interaction, InteractionType } from '@/interfaces/interaction.interface';
import { Document, Schema, model } from 'mongoose';

const interactionSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
    enum: InteractionType,
  },
  contentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

interactionSchema.index({ type: 1, contentId: 1, userId: 1 }, { unique: true });

const interactionModel = model<Interaction & Document>('Interaction', interactionSchema);

export default interactionModel;
