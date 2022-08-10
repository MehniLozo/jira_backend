import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { TagRegisterRequestDto } from './dto/tag-register.req.dto';


@ApiTags('Tag')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('tag')
  @ApiCreatedResponse({
    description: 'save a new tags',
    type: Tag,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async createTag(
        @Body() tagRegisterRequestDto: TagRegisterRequestDto,
    ): Promise<Tag> {
    return await this.tagService.createTag(tagRegisterRequestDto);
  }

  @Get('')
  @ApiCreatedResponse({
    description: 'List all registered tags',
    type: Tag,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findAllTags(): Promise<Tag[]> {
    return await this.tagService.findAllTags();
  }

  @Delete('/:tagId')
  @ApiCreatedResponse({
    description: 'delete a certain tags',
    type: Tag,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteTag(@Param('tagId') tagId: string): Promise<any> {
    return await this.tagService.deleteTag(parseInt(tagId));
  }
}
