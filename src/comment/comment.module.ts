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
  providers: [CommentService,Repository<Comment>], /* eslint-disable-line */
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
