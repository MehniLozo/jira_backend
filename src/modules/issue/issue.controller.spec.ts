import {IssueController} from './issue.controller';
import {IssueService} from './issue.service';
import {Issue} from './issue.entity';
import { Test, TestingModule } from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {IssueRegisterRequestDto} from './dto/issue-register.req.dto';
import {repositoryMockFactory} from '../../repository/repositoryMockFactory';
import { IssuePriority, IssueStatus, IssueType } from './issues.constants';

describe('IssueController Unit Tests',() => {
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

    let issueController: IssueController;
    let issueService: IssueService;

    const testingIssue = {
      description: "Some controller issue",
      priority: IssuePriority.HIGH,
      projectId: 8,
      reporterId: 4,
      status: IssueStatus.INPROGRESS,
      title: "Controller Issue",
      type: IssueType.TASK,
      userIds: [4,2]
                            }
    beforeEach(async () => {

        let module:TestingModule = await Test.createTestingModule({
            controllers: [IssueController],
            providers: [
                {
                    provide: getRepositoryToken(Issue),
                    useFactory: repositoryMockFactory
                },{
                    provide: IssueService,
                    useValue: {
                        createIssue: jest.fn().mockImplementation((dto: IssueRegisterRequestDto) => {
                            Promise.resolve(testingIssue)
                        }),
                        getIssuesByProject: jest.fn().mockImplementation((projectId:number) => {
                            Promise.resolve(
                                [
                                    testingIssue
                                ]
                            )
                        }),
                        getIssueById: jest.fn().mockImplementation((issueId:number) => {
                            Promise.resolve(testingIssue)
                        }),
                        //modifyIssue: jest.fn().mockResolvedValue(testingIssue),
                        modifyIssue: jest.fn().mockImplementation((body:object) => {
                          let k:any;
                          for(let k in body){
                            testingIssue[k] = body[k]
                          }
                          Promise.resolve(testingIssue)
                        }),
                        deleteIssue: jest.fn().mockRejectedValue({deleted:true, message:"Issue has just been deleted"})
                    }
                }
            ]

        }).compile();

        issueController = module.get<IssueController>(IssueController);
        issueService = module.get<IssueService>(IssueService);

        jest.clearAllMocks();
    })

    it("should be defined", () => {
      expect(issueController).toBeDefined();
    })

    describe('createIssue', () => {
      describe('when createIssue is called', () => {
        const {req,res}:any = setup();
        req.body = testingIssue;

        beforeEach(async () => {
          const result = await issueController.doCreateIssue(req,res);
        })
        it('checking up on issueService to be called', () => {
          expect(issueService.createIssue).toBeCalledTimes(1);
          expect(issueService.createIssue).toHaveBeenCalledWith(testingIssue);
        })
      })
    })
    describe('findIssueById', () => {
      describe('findIssueById will return 200 when issue found', () => {
        const {req,res}:any = setup();
        req.params = {issueId:1};

        beforeEach(async () => {
          const result = await issueController.findIssueById(req,res);
        })

        it('Issue should be found and returning valid request', () => {
          expect(issueService.getIssueById).toBeCalled();
          expect(issueService.getIssueById).toHaveBeenCalledWith(parseInt(req.params.issueId));
          expect(res.status).toHaveBeenCalledWith(200);
        })
      })

      describe('findIssueById will 404 when trying to reach unexisting issue', () => {
        const {req,res}:any = setup();
        req.params = {issueId:1};

        beforeEach(async() => {
          jest.spyOn(issueService,"getIssueById").mockResolvedValue("Issue doesn't exist");
          await issueController.findIssueById(req,res)
        })
        it('should return unfound issue', () => {
          //making a mock that returns falsy
          expect(issueService.getIssueById).toBeCalled();
          expect(issueService.getIssueById).toHaveBeenCalledWith(parseInt(req.params.issueId));
          expect(res.status).toHaveBeenCalledWith(404);
        })
      })
    })

    describe("modifyIssue", () => {
      const {req,res}:any = setup();
      req.params = {issueId:1};
      req.body = {description:"New description for the guy"};

      describe("modifyIssue will return an updated issue 201 ", () => {

        beforeEach(async() => {
            await issueController.modifyIssue(req,res);
        })

        it('should be valid update',() => {
          expect(issueService.modifyIssue).toBeCalled();
          expect(res.status).toHaveBeenCalledWith(201);
        })
      })

      describe("modifyIssue will return 400", () => {

        beforeEach(async() => {
          jest.spyOn(issueService,"modifyIssue").mockResolvedValue("Couldn't update");
          await issueController.modifyIssue(req,res);
        })

        it("should be unvalid update", () => {
          expect(issueService.modifyIssue).toBeCalled();
          expect(res.status).toHaveBeenCalledWith(400);
        })
      })
    })

      /*describe('deleteIssue', () => {
          const {req,res}:any = setup();
          req.params = {id:1};

          beforeEach(async () => {
            const result = await issueController.deleteIssue(req,res);

          })

          it('should be truthy', () => {
              expect(res.json).toHaveBeenCalled();
          })
      })*/
  /*  describe('deleteIssue', () => {
        describe('Truthy deletion', () => {
          const {req,res}:any = setup();
          req.params = {id:1};

          beforeAll(async () => {
              const result = await issueController.deleteIssue(req,res);
          })
          it('should be truthy',() => {
              expect(res.json).toHaveBeenCalledTimes(1);
          })
        })*/
        //describe('Falsy deletion', () => {
          /*jest.spyOn(issueService,"deleteIssue").mockResolvedValue({deleted:false,message:"Unsuccessful deletion"});
            it('should be falsy', async () => {
             await issueController.deleteIssue(req.id);
             expect(res.json).toHaveBeenCalled();
          })*/
        //})
    //})

})
