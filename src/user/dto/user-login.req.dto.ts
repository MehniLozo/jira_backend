import { IsNotEmpty, IsString } from 'class-validator';

export class UserloginRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
