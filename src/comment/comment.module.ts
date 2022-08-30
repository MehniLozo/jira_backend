import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import {Comment} from './comment.entity';
import { Repository } from 'typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Comment
    ])
  ],
  // tslint:disable-next-line
  providers: [CommentService,Repository<Comment>],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
