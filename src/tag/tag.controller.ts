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

  @Get('')
  @ApiCreatedResponse({
    description: 'List all registered tags',
    type: Tag,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findAllTags(): Promise<Tag[]> {
    return await this.tagService.findAllTags();
  }
}
