import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { IssueType, IssueStatus, IssuePriority } from '../issues.constants';

export class IssueUpdateRequestDto {
  @IsOptional()
  @IsString()
  @Length(10, 1000)
  @ApiProperty({ type: String })
  description?: string;

  @IsOptional()
  @IsEnum(IssuePriority)
  @ApiProperty({ type: String })
  priority?: IssuePriority;

  @IsOptional()
  @ApiProperty({ type: Number })
  @IsInt()
  projectId?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ type: Number })
  reporterId?: number;

  @IsOptional()
  @ApiProperty({ type: String })
  @IsEnum(IssueStatus)
  status?: IssueStatus;

  @IsOptional()
  @IsString()
  @Length(5, 30)
  @ApiProperty({ type: String })
  title?: string;

  @IsOptional()
  @IsEnum(IssueType)
  @ApiProperty({ type: String })
  type?: IssueType;

  @IsOptional()
  @ApiProperty({ type: Number })
  userIds: number[];

  @IsOptional()
  @IsInt()
  @ApiProperty({ type: Number })
  listPosition?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ type: Number })
  estimate?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ type: Number })
  timeRemaining?: number;
}
