import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectRegisterRequestDto } from './dto/project-register.req.dto';
import { ProjectCategory } from './project.constants';
import { repositoryMockFactory } from '../repository/repositoryMockFactory';

describe('ProjectController Unit Tests', () => {
  function setup() {
    const req = {
      params: {},
      body: {},
    };
    const res = {};
    Object.assign(res, {
      status: jest.fn(
        function status() {
          return this;
        }.bind(res),
      ),
      json: jest.fn(
        function json() {
          return this;
        }.bind(res),
      ),
      send: jest.fn(
        function send() {
          return this;
        }.bind(res),
      ),
    });
    return { req, res };
  }

  let projectController: ProjectController;
  let projectService: ProjectService;
  //let project: Project;
  const updateBody = {
    name: 'Jira Mock',
    url: 'jiraMocking.com',
    description: 'This is some random description',
    category: ProjectCategory.MARKETING,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: getRepositoryToken(Project),
          useFactory: repositoryMockFactory,
        },
        {
          provide: ProjectService,
          useValue: {
            createProject: jest
              .fn()
              .mockImplementation((dto: ProjectRegisterRequestDto) => {
                Promise.resolve({
                  name: dto.name,
                  url: dto.url,
                  description: dto.description,
                  category: dto.category,
                });
              }),
            getProjectById: jest.fn().mockImplementation((id: number) => {
              Promise.resolve({
                id: id,
              });
            }),
            updateProjectById: jest.fn().mockResolvedValueOnce(updateBody),
            deleteProject: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    projectController = module.get<ProjectController>(ProjectController);
    projectService = module.get<ProjectService>(ProjectService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  });

  describe('createProject', () => {
    describe('when createProject is called', () => {
      const { req, res }: any = setup();
      req.body = {
        name: 'Jira',
        url: 'jira.com',
        description: 'MyJiraProject',
        category: ProjectCategory.SOFTWARE,
      };
      beforeEach(async () => {
        await projectController.createProject(req, res);
      });

      it('expecting the projectService to be called', () => {
        expect(projectService.createProject).toBeCalledTimes(1);
        expect(projectService.createProject).toHaveBeenCalledWith(req.body);
        expect(res.json).toHaveBeenCalled();
        //expect(res.status).toHaveBeenCalledWith(201);
      });
    });
  });

  describe('getProjectById', () => {
    const { req, res }: any = setup();
    req.params = { projectId: 1 };
    it('return projects infos', async () => {
      await projectController.findProjectById(req, res);
      expect(projectService.getProjectById).toHaveBeenCalledWith(
        parseInt(req.params.projectId),
      );
      expect(res.json).toHaveBeenCalled();
    });

    it('should return an error for the non existant project', async () => {
      jest
        .spyOn(projectService, 'getProjectById')
        .mockResolvedValueOnce('Project doesnt exist');
      await projectController.findProjectById(req, res);
      expect(projectService.getProjectById).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('updateProjectById', () => {
    const { req, res }: any = setup();
    req.body = updateBody;
    req.params = { projectId: 1 };
    describe('when updateProject is called', () => {
      it('it should return the updated project', async () => {
        await projectController.updateProjectById(req, res);
        expect(projectService.updateProjectById).toBeCalledTimes(1);
        expect(projectService.updateProjectById).toHaveBeenCalledWith(
          req.params.projectId,
          req.body,
        );
        expect(res.status).toHaveBeenCalledWith(200);
      });
    });
  });

  describe('deleteProject', () => {
    const { req, res }: any = setup();
    req.body = updateBody;
    req.params = { projectId: 1 };
    it('should return that the desired project has been deleted', async () => {
      await projectController.deleteProject(req, res);
      expect(projectService.deleteProject).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('falsy deletion of the project', async () => {
      jest.spyOn(projectService, 'deleteProject').mockResolvedValueOnce({
        deleted: false,
        message: 'Something went wrong',
      });
      await projectController.deleteProject(req, res);
      expect(projectService.deleteProject).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
