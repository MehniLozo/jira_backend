import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  Length,
} from 'class-validator';
import { IssueType, IssueStatus, IssuePriority } from '../issues.constants';

export class IssueRegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  description: string;

  @IsNotEmpty()
  @IsEnum(IssuePriority)
  @ApiProperty({ type: String })
  priority: IssuePriority;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number })
  projectId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number })
  reporterId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number })
  creatorId: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  @IsEnum(IssueStatus)
  status: IssueStatus;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  @IsEnum(IssueType)
  type: IssueType;

  @IsOptional()
  @ApiProperty({ type: Number })
  userIds: number[];
}
