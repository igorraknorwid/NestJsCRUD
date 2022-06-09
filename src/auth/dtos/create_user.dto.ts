/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  type: string;
}
