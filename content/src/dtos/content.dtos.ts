import { IsDataURI, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  public title: string;

  @IsString()
  public story: string;

  @IsDataURI()
  public datePublished: string;
}

export class updateContentDto {
  @IsString()
  public title?: string;

  @IsString()
  public story?: string;
}
