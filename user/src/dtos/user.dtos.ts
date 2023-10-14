import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsPhoneNumber()
  public phone: string;
}

export class UpdateUserDto {
  @IsString()
  public firstName?: string;

  @IsString()
  public lastName?: string;

  @IsEmail()
  public email?: string;

  @IsPhoneNumber()
  public phone?: string;
}
