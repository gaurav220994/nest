import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail(null, { message: 'email not provided' })
  email: string;

  // @IsNotEmpty()
  // password: string;
}
