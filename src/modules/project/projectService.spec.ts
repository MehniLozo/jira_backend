import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import {Project} from './project.entity';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';
import {ProjectCategory} from './project.constants';
import {ProjectService} from './project.service';
import {TypeOrmModule,getRepositoryToken} from '@nestjs/typeorm';
//import appDataSource from '../../config/app-data-source';
import {MockType,repositoryMockFactory} from '../../repository/repositoryMockFactory';

describe('ProjectService', () => {

//Mocking the repository (persistence layer) in order to simplify testing and keep it only in service scope
let projectService: ProjectService;
let projectRepositoryMock: MockType<Repository<Project>>;
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
    projectRepositoryMock = module.get(getRepositoryToken(Project));
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
       expect(project.url).toBe("jira.com")
       expect(project.description).toBe("MyJiraProject")
       expect(project.category).toBe("software")

    })
  })
  //Get some registered project
  describe('getProjectById', () => {
    it('should send back the desired project alongside with its detailed information',async() => {
          await projectService.getProjectById(1);
          expect(projectRepositoryMock.findOne).toBeCalled();
        })
    })
  //Mock Update project
  describe('updateProjectById', () => {
    it('should call the update method', async ()=> {
      const updatedProject = await projectService.updateProjectById(1,{
        name: 'Jira Mock',
        url: 'jiraMocking.com',
        description: 'This is some random description',
        category: ProjectCategory.MARKETING
      });
      //expect(updatedProject).toEqual(SomeNewProject)
      expect(projectRepositoryMock.update).toBeCalledTimes(1);
      expect(projectRepositoryMock.update).toBeCalledWith(1,
        {
        name:'Jira Mock',
        url: 'jiraMocking.com',
        description: 'This is some random description',
        category: ProjectCategory.MARKETING
    });

    });
  })
  // Mock Delete project
  describe('deleteProject', () => {
    it('should return {deleted: true}', () => {
      expect(projectService.deleteProject(5)).resolves.toEqual({deleted:true});
    })
    it("should return {deleted: false, message: err.message}", () => {
      const repoSpy = jest.spyOn(projectRepositoryMock,'delete')
      .mockRejectedValueOnce(new Error('Garbage delete'));
      //supposedly with a project that doesn't exist
      expect(projectService.deleteProject(5)).resolves.toEqual({
        deleted: false,
        message: 'Garbage delete',
      });
      expect(repoSpy).toHaveBeenCalled();
      expect(repoSpy).toBeCalledTimes(1);
      expect(repoSpy).toBeCalledWith({id:5}) //making sure that the previous simulation went through
    })
  })



})
