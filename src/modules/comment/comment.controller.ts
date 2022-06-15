import { Body, Controller, Post,Get,Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created comment object as response',
    type: Comment,
  })
  @ApiBadRequestResponse({ description: 'Comment cannot register. Try again!' })
  async doCreateComment(
    commentRegister: Comment,
  ): Promise<Comment> {
    return await this.commentService.createComment(commentRegister);
  }

  @Get('')
  @ApiCreatedResponse({
    description: 'List all registered comments',
    type: Comment,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findCommentsByProject(
    id:number,
  ): Promise<Comment[]> {
    return await this.commentService.getCommentsByProject(id);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    description: 'List specified registered comment',
    type: Comment,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findCommentById(
    id:number,
  ): Promise<Comment> {
    return await this.commentService.getCommentById(id);
  }


  @Delete('/:id') //with id param
  @ApiCreatedResponse({
    description: 'Delete a specified comment by id',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteComment(
    id:number,
  ): Promise<Boolean> {
    return await this.commentService.deleteComment(id);
  }}
