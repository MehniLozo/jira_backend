import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {Issue} from './issue.entity';
import {IssueRegisterRequestDto} from './dto/issue-register.req.dto';
import {MockType,repositoryMockFactory} from '../../repository/repositoryMockFactory';
import { IssueService } from './issue.service';
import {TypeOrmModule,getRepositoryToken} from '@nestjs/typeorm';

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
})