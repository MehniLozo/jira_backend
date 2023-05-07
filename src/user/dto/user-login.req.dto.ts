import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserloginRequestDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  password: string;
}
