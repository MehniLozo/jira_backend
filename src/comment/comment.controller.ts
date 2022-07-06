import { Body, Controller, Post,Get,Delete,Res,Req,Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import  {Comment}  from './comment.entity';
import { CommentService } from './comment.service';
import { Request, Response } from 'express';

@ApiTags('Comment')
@Controller('issues/:issueId')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/comments')
  @ApiCreatedResponse({
    description: 'Created comment object as response',
    type: Comment,
  })
  @ApiBadRequestResponse({ description: 'Comment cannot register. Try again!' })
  async doCreateComment(
    @Req() req:Request, @Res() res: Response
  ): Promise<any> {
    const resultComment =  await this.commentService.createComment(req.body);
    return res.status(resultComment instanceof Comment? 201:405).json(resultComment);
  }

  @Get('/comments')
  @ApiCreatedResponse({
    description: 'List all registered comments',
    type: Comment,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findCommentsByIssue(
    @Req() req:Request, @Res() res: Response
  ): Promise<any> {
    const resultComment =  await this.commentService.getCommentsByIssue(parseInt(req.params.issueId));
    return res.status(typeof resultComment?404:200).json(resultComment);
  }

  @Get('/comments/:commId')
  @ApiCreatedResponse({
    description: 'List specified registered comment',
    type: Comment,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findCommentById(
    @Req() req:Request, @Res() res: Response
  ): Promise<any> {
     const resultComment = await this.commentService.getCommentById(parseInt(req.params.commId));
     return res.status(resultComment instanceof Comment ?200:404).json(resultComment);
  }
  @Put('/comments/:commId')
  @ApiCreatedResponse({
    description: 'List specified registered comment',
    type: Comment,
  })
  async modifyComment(
    @Req() req:Request, @Res() res: Response
  ):Promise<any>{

     const resultComment = await this.commentService.modifyComment(parseInt(req.params.commId),req.body);
     return res.status(resultComment instanceof Comment ?201:400).json(resultComment);
  }
  @Delete('/comments/:commId') //with id param
  @ApiCreatedResponse({
    description: 'Delete a specified comment by id',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteComment(
    @Req() req:Request, @Res() res: Response
  ): Promise<any> {
    const resultComment =  await this.commentService.deleteComment(parseInt(req.params.commId));
    return res.status(resultComment.deleted == true ? 200:400).json(resultComment);

  }}
