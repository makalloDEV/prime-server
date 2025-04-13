import { Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @Length(3, 15, { message: 'Username must be from 3 to 15 symbols' })
  username: string;

  @MinLength(8, { message: 'Password must be 8 symbols or more' })
  password: string;
}
