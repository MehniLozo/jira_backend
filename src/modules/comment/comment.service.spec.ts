import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {Comment} from './comment.entity';
import {CommentRegisterRequestDto} from './dto/comment-register.req.dto';
import {CommentService} from './comment.service';
import {TypeOrmModule,getRepositoryToken} from '@nestjs/typeorm';
import {MockType,repositoryMockFactory} from '../../repository/repositoryMockFactory';

describe('CommentService', () => {
  let commentService:CommentService;
  let commentRepositoryMock: MockType<Repository<Comment>>;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService,
        {
          provide: getRepositoryToken(Comment),
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    commentRepositoryMock = module.get(getRepositoryToken(Comment));


  })
    it('Should be defined', () => {
      expect(commentService).toBeDefined();
    })

    describe('createComment', () => {
        let newComment : Comment;
        const registerComment: CommentRegisterRequestDto = {
          body:"Test issssuee",
          userId: 1,
          issueId: 6
        }
      describe("Positive comment creation", () => {
        beforeEach(async () => {
          newComment = await commentService.createComment(registerComment);
        })
        it('should create a comment',() => {
          expect(commentRepositoryMock.save).toBeCalled();
          expect(commentRepositoryMock.save).toBeCalledWith(registerComment);
          expect(newComment.body).toEqual(registerComment.body);
        })
      })
    })

   describe('getCommentsByIssue', () => {
     describe('Existing Issue', () => {
       it('Issue does exist', async () => {
         const comments = await commentService.getCommentsByIssue(6)
         expect(commentRepositoryMock.find).toHaveBeenCalled();
       })
     })

     describe('Invalid issue', () => {
       it("Issue doesn't exist", async() => {
         //mocking the function
         jest.spyOn(commentRepositoryMock,"find").mockResolvedValue("Issue doesn't exist")
         const comments = await commentService.getCommentsByIssue(6)
         expect(commentRepositoryMock.find).toHaveBeenCalled();

       })
     })
   })
})
