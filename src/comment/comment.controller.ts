import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentRegisterRequestDto } from './dto/comment-register.req.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('')
  @ApiCreatedResponse({
    description: 'Created comment object as response',
    type: Comment,
  })
  @ApiBadRequestResponse({ description: 'Comment cannot register. Try again!' })
  async doCreateComment(
    @Body() commentRegisterRequestDto: CommentRegisterRequestDto,
  ): Promise<Comment> {
    return await this.commentService.createComment(commentRegisterRequestDto);
  }

  @Get('/:commId')
  @ApiCreatedResponse({
    description: 'List specified registered comment',
    type: Comment,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findCommentById(@Param('commId') commId: string): Promise<any> {
    return await this.commentService.getCommentById(parseInt(commId));
  }
  @Put('/:commId')
  @ApiCreatedResponse({
    description: 'List specified registered comment',
    type: Comment,
  })
  async modifyComment(
    @Param('commId') commId: string,
    @Body('') body,
  ): Promise<any> {
    return await this.commentService.modifyComment(parseInt(commId), body);
  }
  @Delete('/:commId')
  @ApiCreatedResponse({
    description: 'Delete a specified comment by id',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteComment(@Param('commId') commId: string): Promise<any> {
    return await this.commentService.deleteComment(parseInt(commId));
  }
}
