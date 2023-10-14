import { model, Schema, Document } from 'mongoose';
import { Content } from '@interfaces/content.interface';

const contentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  story: {
    type: String,
    required: true,
  },
  datePublished: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const contentModel = model<Content & Document>('Content', contentSchema);

export default contentModel;
