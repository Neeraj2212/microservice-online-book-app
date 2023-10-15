export interface Interaction {
  type: InteractionType;
  contentId: string;
}

export interface TopContents {
  contentIds: string[];
}

export enum InteractionType {
  LIKE = 'like',
  READ = 'read',
}
