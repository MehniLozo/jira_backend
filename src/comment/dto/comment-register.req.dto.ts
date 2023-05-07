import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRegisterRequestDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  body: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number })
  issueId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @IsInt()
  userId: number;
}
