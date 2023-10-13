import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrUpdateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsPhoneNumber()
  public phone: string;
}
