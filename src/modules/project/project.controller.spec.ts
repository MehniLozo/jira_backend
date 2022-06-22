import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {Project} from './project.entity';
import { Test, TestingModule } from '@nestjs/testing';
import {TypeOrmModule,getRepositoryToken} from '@nestjs/typeorm';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';
import {ProjectCategory} from './project.constants';
import {repositoryMockFactory} from '../../repository/repositoryMockFactory';

describe('ProjectController',() => {
  let projectController: ProjectController;
  let projectService: ProjectService;

  beforeEach(async () => {
    let module:TestingModule ;
     module = await Test.createTestingModule({
       controllers: [ProjectController],
       providers: [
        {
          provide: getRepositoryToken(Project),
          useFactory: repositoryMockFactory
        },{
        provide:ProjectService,
        useValue: {
        createProject: jest.fn().mockImplementation((dto: ProjectRegisterRequestDto) => {
          Promise.resolve({
            name:dto.name,
            url:dto.url,
            description:dto.description,
            category:dto.category
          })
        }),
        findProjectById:jest.fn().mockImplementation(),
        deleteProject:jest.fn().mockResolvedValue({deleted:true})
      }
    }
      ],


    }).compile()

    projectController= module.get<ProjectController>(ProjectController);
    projectService= module.get<ProjectService>(ProjectService);
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  })
  describe('createProject', () => {
    describe('when createProject is called', () => {
      let project: Project;
      let createProjectDTO: ProjectRegisterRequestDto;
      let spyService:any;

      const mockProject  = {

        name:'Jira',
        url:'jira.com',
        description:'MyJiraProject',
        category:ProjectCategory.SOFTWARE
      }
      beforeEach(async() =>{
        createProjectDTO = {
        name:mockProject.name,
        url:mockProject.url,
        description:mockProject.description,
        category:mockProject.category
       }
       project = await projectController.createProject(createProjectDTO)
      })

      it('expecting the projectService to be called', () => {
        expect(projectService.createProject).toBeCalledTimes(1);
        expect(projectService.createProject).toHaveBeenCalledWith(createProjectDTO)


      })
      it('when the creation is done it should return the project',async() => {
        //URGENT
        //await expect(project).toEqual(mockProject);
      })
    })

  })




  /*describe('findProjectById',() => {
    it('should return a specific project by id',async() => {
      const result = ['test'];
      jest.spyOn(projectService,'findProjectById').mockImplementation(() => result);

    expect(await projectController.findProjectById(0)).toBe(result);
    })
  })*/

})
