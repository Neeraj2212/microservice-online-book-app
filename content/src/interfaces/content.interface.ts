export interface Content {
  title: string;
  story: string;
  datePublished: Date;
  userId: string;
}

export enum InteractionType {
  LIKE = 'like',
  READ = 'read',
}
