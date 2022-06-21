import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {Project} from './project.entity';
import { Test, TestingModule } from '@nestjs/testing';
import {TypeOrmModule,getRepositoryToken} from '@nestjs/typeorm';
import {repositoryMockFactory} from '../../repository/repositoryMockFactory';

describe('ProjectController',() => {
  let projectController: ProjectController;
  let projectService: ProjectService;

  beforeEach(async () => {
    let module:TestingModule ;
     module = await Test.createTestingModule({
       controllers: [ProjectController],
       providers:[ProjectService,
        {
          provide: getRepositoryToken(Project),
          useFactory: repositoryMockFactory
        }
       ],
    }).compile()

    projectController= module.get<ProjectController>(ProjectController);
    projectService= module.get<ProjectService>(ProjectService);
  })

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  })





  /*describe('findProjectById',() => {
    it('should return a specific project by id',async() => {
      const result = ['test'];
      jest.spyOn(projectService,'findProjectById').mockImplementation(() => result);

    expect(await projectController.findProjectById(0)).toBe(result);
    })
  })*/

})
