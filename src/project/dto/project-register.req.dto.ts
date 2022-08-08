import { ProjectCategory } from '../project.constants';
import { IsNotEmpty, Length, IsUrl, IsEnum, IsString } from 'class-validator';

export class ProjectRegisterRequestDto {
  @IsNotEmpty()
  @Length(5, 20)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(ProjectCategory)
  category: ProjectCategory;

  userIds: number[];

  @IsNotEmpty()
  leadId: number;
}
