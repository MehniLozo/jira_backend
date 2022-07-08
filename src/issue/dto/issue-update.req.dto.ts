import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { IssueType, IssueStatus, IssuePriority } from '../issues.constants';
import { User } from '../../user/user.entity';

export class IssueUpdateRequestDto {
  @IsOptional()
  @IsString()
  @Length(10, 100)
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
  @Length(5, 10)
  title?: string;

  @IsOptional()
  @IsEnum(IssueType)
  type?: IssueType;

  @IsOptional()
  userIds?: number[];

  @IsOptional()
  users?: User[];

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
