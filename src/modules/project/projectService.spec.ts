import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {Project} from './project.entity';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';
import {ProjectCategory} from './project.constants';
import {ProjectService} from './project.service';
import {TypeOrmModule,getRepositoryToken} from '@nestjs/typeorm';
//import appDataSource from '../../config/app-data-source';
import {repositoryMockFactory} from './repositoryMockFactory';
import {MockType} from './repositoryMockFactory';

describe('ProjectService', () => {

//Mocking the repository (persistence layer) in order to simplify testing and keep it only in service scope
let projectService: ProjectService;
let repositoryMock: MockType<Repository<Project>>;
  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService,
        {
          provide: getRepositoryToken(Project),
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
    repositoryMock = module.get(getRepositoryToken(Project));
  })

  it('Should be defined', () => {
    expect(projectService).toBeDefined();
  })


  describe('createProject()', () => {
    it('should create project', async () => {
      const registerProject: ProjectRegisterRequestDto = {
        name:'Jira',
        url:'jira.com',
        description:'MyJiraProject',
        category:ProjectCategory.SOFTWARE
      }
      const project = await projectService.createProject(registerProject);
       expect(project.name).toBe('Jira');

    })
  })

})
