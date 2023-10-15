import { IsDateString, IsString } from 'class-validator';

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
