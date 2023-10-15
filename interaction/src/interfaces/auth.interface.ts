import { Request } from 'express';

export interface DataStoredInToken {
  _id: string;
}

export interface RequestWithUserId extends Request {
  userId: string;
}
