import { IsEnum, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { IssueType, IssueStatus, IssuePriority } from '../issues.constants';

export class IssueUpdateRequestDto {
  @IsOptional()
  @IsString()
  @Length(10, 1000)
  description?: string;

  @IsOptional()
  @IsEnum(IssuePriority)
  priority?: IssuePriority;

  @IsOptional()
  @IsInt()
  projectId?: number;

  @IsOptional()
  @IsInt()
  reporterId?: number;

  @IsOptional()
  @IsEnum(IssueStatus)
  status?: IssueStatus;

  @IsOptional()
  @IsString()
  @Length(5, 30)
  title?: string;

  @IsOptional()
  @IsEnum(IssueType)
  type?: IssueType;

  @IsOptional()
  userIds: number[];

  @IsOptional()
  @IsInt()
  listPosition?: number;

  @IsOptional()
  @IsInt()
  estimate?: number;

  @IsOptional()
  @IsInt()
  timeRemaining?: number;
}
