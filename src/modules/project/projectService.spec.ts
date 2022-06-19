import { Test, TestingModule } from '@nestjs/testing';
import {Project} from './project.entity';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';
import {ProjectCategory} from './project.constants';
import {ProjectService} from './project.service';
//import { plainToClass } from 'class-transformer';
import {TypeOrmModule} from '@nestjs/typeorm';

  //const project: Project = plainToClass(ProjectRegisterRequestDto,{id: 1, })

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

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
  })

  it('Should be defined', () => {
    expect(projectService).toBeDefined();
  })

  /*
  describe('createProject()', () => {
    it('should create project', async () => {
      const registerProject: ProjectRegisterRequestDto = {
        name:'first',
        url:'first.com',
        description:'myFirstProjectEver',
        category:ProjectCategory.SOFTWARE
      }
      const project = await projectService.createProject(registerProject);
       expect(project.name).toBe('first');

    })
  })*/

})
