export interface Interaction {
  type: InteractionType;
  contentId: string;
}

export enum InteractionType {
  LIKE = 'like',
  READ = 'read',
}
