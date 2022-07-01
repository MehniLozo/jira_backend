import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {Comment} from './comment.entity';
import { Test, TestingModule } from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {CommentRegisterRequestDto} from './dto/comment-register.req.dto';
import {repositoryMockFactory} from '../../repository/repositoryMockFactory';

describe('CommentController', () => {
  function setup() {
    const req = {
      params: {},
      body: {},
    }
    const res = {}
    Object.assign(res, {
      status: jest.fn(
        function status() {
          return this
        }.bind(res),
      ),
      json: jest.fn(
        function json() {
          return this
        }.bind(res),
      ),
      send: jest.fn(
        function send() {
          return this
        }.bind(res),
      ),
    })
    return {req, res}
   }

   let commentController : CommentController;
   let commentService : CommentService;
   const testingComment = {
     body: "some testing comment",
     issueId:1,
     userId: 1,
   }
  beforeEach(async () => {

        let module:TestingModule = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [
                {
                    provide: getRepositoryToken(Comment),
                    useFactory: repositoryMockFactory
                },{
                    provide: CommentService,
                    useValue: {
                        createComment: jest.fn().mockImplementation((dto: CommentRegisterRequestDto) => {
                            Promise.resolve(testingComment)
                        }),
                        getCommentsByIssue: jest.fn().mockImplementation((projectId:number) => {
                            Promise.resolve(
                                [
                                    testingComment
                                ]
                            )
                        }),
                        getCommentById: jest.fn().mockImplementation((commentId:number) => {
                            Promise.resolve(testingComment)
                        }),
                        //modifyComment: jest.fn().mockResolvedValue(testingComment),
                        modifyComment: jest.fn().mockImplementation((body:object) => {
                          let k:any;
                          for(let k in body){
                            testingComment[k] = body[k]
                          }
                          Promise.resolve(testingComment)
                        }),
                        deleteComment: jest.fn().mockResolvedValue({deleted:true, message:"Comment has just been deleted"})
                    }
                }
            ]

        }).compile();

        commentController = module.get<CommentController>(CommentController);
        commentService = module.get<CommentService>(CommentService);

        jest.clearAllMocks();
    })

    it("should be defined", () => {
      expect(commentController).toBeDefined();
    })

    describe('createComment', () => {
      describe('when doCreateComment is called', () => {
        const {req,res}:any = setup();
        req.body = testingComment;
        beforeEach(async () => {
            await commentController.doCreateComment(req,res);
        })
        it('checking up on commentService to be called', () => {
          expect(commentService.createComment).toBeCalledTimes(1);
          expect(commentService.createComment).toHaveBeenCalledWith(testingComment);
          expect(res.json).toHaveBeenCalled();
          //expect(res.status).toHaveBeenCalledWith(201);
        })
      })
    })

  describe('deleteComment', () => {
    const {req,res}:any = setup();
    req.params = {commId:1};
    beforeEach(async () => {
        await commentController.deleteComment(req,res);
    })

    it('checking up on commentService to be called', () => {
      expect(commentService.deleteComment).toBeCalledTimes(1);
      expect(commentService.deleteComment).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
    })
  })

})
