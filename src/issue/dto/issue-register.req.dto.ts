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
  description: string;

  @IsNotEmpty()
  @IsEnum(IssuePriority)
  priority: IssuePriority;

  @IsNotEmpty()
  @IsInt()
  projectId: number;

  @IsNotEmpty()
  @IsInt()
  reporterId: number;

  @IsNotEmpty()
  @IsEnum(IssueStatus)
  status: IssueStatus;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  title: string;

  @IsNotEmpty()
  @IsEnum(IssueType)
  type: IssueType;

  @IsOptional()
  userIds: number[];
}
