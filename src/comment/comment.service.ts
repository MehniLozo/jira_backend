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

  async getCommentById(id: number): Promise<Comment> {
    return this.commentRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async modifyComment(id: number, newMessage: object): Promise<any> {
    return await this.commentRepo.update(id, newMessage);
  }
  async deleteComment(id: number): Promise<any> {
    return await this.commentRepo.delete({ id });
  }
}
