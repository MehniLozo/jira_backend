import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentRegisterRequestDto } from './dto/comment-register.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async createComment(
    commentRegister: CommentRegisterRequestDto,
  ): Promise<Comment> {
    return await this.commentRepo.save(commentRegister);
  }

  async getCommentById(id: number): Promise<Comment | string> {
    try {
      return this.commentRepo.findOne({ where: { id } });
    } catch (err) {
      console.log(err.message);
      return "Comment doesn't exist";
    }
  }

  async modifyComment(id: number, newMessage: any): Promise<any> {
    try {
      return await this.commentRepo.update(id, newMessage);
    } catch (err) {
      console.log(err.message);
      return 'Something wrong';
    }
  }
  async deleteComment(
    id: number,
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.commentRepo.delete({ id });
      return { deleted: true };
    } catch (e) {
      console.log(e.message);
      return { deleted: false, message: 'Comment doesnt exist' };
    }
  }
}
