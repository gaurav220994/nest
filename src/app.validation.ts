import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail(undefined, { message: 'email not provided' })
  email: string;

  @IsNotEmpty()
  password: string;
}
