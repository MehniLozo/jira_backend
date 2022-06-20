import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {Project} from './project.entity';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';
import {ProjectCategory} from './project.constants';
import {ProjectService} from './project.service';
//import { plainToClass } from 'class-transformer';
import {TypeOrmModule,getRepositoryToken} from '@nestjs/typeorm';
//import appDataSource from '../../config/app-data-source';
  //const project: Project = plainToClass(ProjectRegisterRequestDto,{id: 1, })
import {repositoryMockFactory} from './repositoryMockFactory';
describe('ProjectService', () => {


 /*
 //causing test error
 beforeAll(async () => {
  const module = await Test.createTestingModule({
     imports: [
       TypeOrmModule.forRoot(),
       TypeOrmModule.forFeature([Project])
     ],
     providers: [ProjectService]
   }).compile();
 }); */

let projectService: ProjectService;
let repositoryMock: Repository<Project>;
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
        name:'fourth',
        url:'fourth.com',
        description:'myFourthProject',
        category:ProjectCategory.SOFTWARE
      }
      const project = await projectService.createProject(registerProject);
       expect(project.name).toBe('fourth');

    })
  })

})
