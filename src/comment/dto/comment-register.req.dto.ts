import { IsInt, IsNotEmpty } from 'class-validator';

export class CommentRegisterRequestDto {
  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  @IsInt()
  issueId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
