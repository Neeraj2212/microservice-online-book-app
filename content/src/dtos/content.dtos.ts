import { InteractionType } from '@/interfaces/content.interface';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  public title: string;

  @IsString()
  public story: string;

  @IsDateString()
  public datePublished: string;
}

export class UpdateContentDto {
  @IsString()
  public title?: string;

  @IsString()
  public story?: string;
}

export class TopContentQueryParams {
  @IsEnum(InteractionType, { message: 'sortBy must be one of read or like' })
  public sortBy?: string;
}
