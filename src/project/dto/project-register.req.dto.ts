import { ProjectCategory } from '../project.constants';
import { IsNotEmpty, Length, IsUrl, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectRegisterRequestDto {
  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  @ApiProperty({ type: String })
  url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  description: string;

  @IsNotEmpty()
  @IsEnum(ProjectCategory)
  @ApiProperty({ type: String })
  category: ProjectCategory;

  userIds: number[];

  leadId: number;
}
