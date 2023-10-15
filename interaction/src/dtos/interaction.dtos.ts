import { InteractionType } from '@/interfaces/interaction.interface';
import { IsEnum, IsString } from 'class-validator';

export class CreateInteractionDto {
  @IsEnum(InteractionType)
  type: string;

  @IsString()
  contentId: string;
}
