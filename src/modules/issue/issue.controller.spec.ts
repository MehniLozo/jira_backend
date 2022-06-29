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
                        modifyIssue: jest.fn().mockResolvedValue(testingIssue),
                        deleteIssue: jest.fn().mockRejectedValue({deleted:true})
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

})
