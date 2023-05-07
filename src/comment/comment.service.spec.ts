import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Comment } from './comment.entity';
import { CommentRegisterRequestDto } from './dto/comment-register.req.dto';
import { CommentService } from './comment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockType,
  repositoryMockFactory,
} from '../repository/repositoryMockFactory';

describe('CommentService', () => {
  let commentService: CommentService;
  let commentRepositoryMock: MockType<Repository<Comment>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    commentRepositoryMock = module.get(getRepositoryToken(Comment));
  });
  it('Should be defined', () => {
    expect(commentService).toBeDefined();
  });

  describe('createComment', () => {
    let newComment: Comment;
    const registerComment: CommentRegisterRequestDto = {
      body: 'Test issssuee',
      userId: 1,
      issueId: 6,
    };
    describe('Positive comment creation', () => {
      beforeEach(async () => {
        newComment = await commentService.createComment(registerComment);
      });
      it('should create a comment', () => {
        expect(commentRepositoryMock.save).toBeCalled();
        expect(commentRepositoryMock.save).toBeCalledWith(registerComment);
        expect(newComment.body).toEqual(registerComment.body);
      });
    });
  });
  describe('getCommentById', () => {
    describe('Existing comment', () => {
      it('comment does exist', async () => {
        await commentService.getCommentById(1);
        expect(commentRepositoryMock.findOne).toBeCalled();
      });
    });
    describe('unexsiting comment', () => {
      it("comment doesn't exist", async () => {
        jest
          .spyOn(commentRepositoryMock, 'findOne')
          .mockResolvedValue("Comment doesn't exist");
        const result = await commentService.getCommentById(1);
        expect(commentRepositoryMock.findOne).toBeCalled();
        expect(result).toEqual("Comment doesn't exist");
      });
    });
  });
  describe('modifyComment', () => {
    const bodyUpdate = {
      body: 'this is some comment update',
    };
    it('comment body should be changed', async () => {
      await commentService.modifyComment(1, bodyUpdate);
      expect(commentRepositoryMock.update).toBeCalled();
      expect(commentRepositoryMock.update).toBeCalledWith(1, bodyUpdate);
    });
  });

  describe('deleteComment', () => {
    it('comment should be deleted', async () => {
      const result = await commentService.deleteComment(1);
      expect(commentRepositoryMock.delete).toBeCalled();
      expect(result).toEqual({ deleted: true });
    });
  });
});
