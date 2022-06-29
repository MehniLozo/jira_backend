import { Repository } from 'typeorm';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import {Issue} from './issue.entity';
import {IssueRegisterRequestDto} from './dto/issue-register.req.dto';
import {MockType,repositoryMockFactory} from '../../repository/repositoryMockFactory';
import { IssueService } from './issue.service';
import {TypeOrmModule,getRepositoryToken} from '@nestjs/typeorm';
import { IssuePriority, IssueStatus, IssueType } from './issues.constants';

describe('IssueService', () => {
    let issueService: IssueService;
    let issueRepositoryMock: MockType<Repository<Issue>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IssueService,
            {
                provide: getRepositoryToken(Issue),
                useFactory: repositoryMockFactory 
            }
        ],
        }).compile();

        issueService = module.get<IssueService>(IssueService);
        issueRepositoryMock = module.get(getRepositoryToken(Issue));
    })

    it('Should be defined', () => {
    expect(issueService).toBeDefined();
  })

    describe('createIssue()', () => {
        it('should create a new issue', async () => {
            const registerIssue: IssueRegisterRequestDto = {
                description: "Some high issue",
                priority: IssuePriority.HIGHEST,
                projectId: 8,
                reporterId: 4,
                status: IssueStatus.BACKLOG,
                title: "High very high issue",
                type: IssueType.BUG,
                userIds:[1,5],
                users: []
            }
            const issue = await issueService.createIssue(registerIssue)
            expect(issue.description).toBe(registerIssue.description);
            expect(issue.priority).toBe(registerIssue.priority);
            expect(issue.projectId).toBe(registerIssue.projectId);
            expect(issue.reporterId).toBe(registerIssue.reporterId);
        })

    })
    //get some registered issues
    describe('getIssuesByProject',() => {
        it('should return an array of issues based on the projectId', async () => {
            await issueService.getIssuesByProject(8);
            expect(issueRepositoryMock.find).toBeCalled();
        })
    })

    describe('getIssueById', () => {
        it('should return an issue by id', async () => {
            await issueService.getIssueById(3);
            expect(issueRepositoryMock.findOne).toBeCalled();
        })
    })
})