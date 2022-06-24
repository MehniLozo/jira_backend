import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {Project} from './project.entity';
import { Test, TestingModule } from '@nestjs/testing';
import {TypeOrmModule,getRepositoryToken} from '@nestjs/typeorm';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';
import {ProjectCategory} from './project.constants';
import {repositoryMockFactory} from '../../repository/repositoryMockFactory';

//Way of testing with mocking is gonna be utterly changed
//gonna use request mocking

describe('ProjectController Unit Tests',() => {

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

  let projectController: ProjectController;
  let projectService: ProjectService;
  //let project: Project;

  const updateBody = {
    name: 'Jira Mock',
    url: 'jiraMocking.com',
    description: 'This is some random description',
    category: ProjectCategory.MARKETING
  }

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
        getProjectById:jest.fn().mockImplementation((id:number) => {
          Promise.resolve({
            id:id,
           })
        }),
        /*updateProjectById: jest.fn().mockImplementation((id:number,updateBody:ProjectRegisterRequestDto) => {

          Promise.resolve(updateBody)
        }),*/
        updateProjectById: jest.fn().mockResolvedValueOnce(updateBody),
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
      const {req,res}:any = setup();

      let createProjectDTO: ProjectRegisterRequestDto;

      req.body  = {
        name:'Jira',
        url:'jira.com',
        description:'MyJiraProject',
        category:ProjectCategory.SOFTWARE
      }
      beforeEach(async() =>{

        const resultProject = await projectController.createProject(req,res)
      })

      it('expecting the projectService to be called', () => {
        expect(projectService.createProject).toBeCalledTimes(1);
        expect(projectService.createProject).toHaveBeenCalledWith(req.body)
      })
      it('when the creation is done it should return the project',async() => {
        //URGENT
        //await expect(project).toEqual(mockProject);
      })
    })

  })



  /*
  describe('createProject', () => {
    describe('when createProject is called', () => {
      let createProjectDTO: ProjectRegisterRequestDto;

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
  */

/*
    describe('getProjectById', () => {
      it('return projects infos', async() => {
        await projectController.findProjectById(1);
        expect(projectService.getProjectById).toBeCalled()
      })

      it('should return an error for the non existant project', async() => {
        const spyGetProject = jest.spyOn(projectService,"getProjectById")
          .mockResolvedValueOnce("Project doesnt exist");
        await expect(projectController.findProjectById(1)).resolves
          .toEqual("Project doesnt exist");
        expect(projectService.getProjectById).toBeCalled();
      })
    })

    describe('updateProjectById', () => {
      describe('when createProject is called', () => {
        it('it should return the updated project',async() => {

          await expect(projectController.updateProjectById(1,updateBody)).resolves.toEqual(updateBody);
          //expect(projectController.updateProjectById).toBeCalledTimes(1);
        })
      })

    })

    describe('deleteProject', () => {

          it('should return that the desired project has been deleted', async () => {
              await expect(projectController.deleteProject(1)).resolves.toEqual({
                deleted:true,
              })
          })

          it('falsy deletion of the project',async() => {
            const falsyDeleteProjectSpy = jest.spyOn(projectService,'deleteProject')
              .mockResolvedValueOnce({deleted:false, message:"Something went wrong"});
            await expect(projectController.deleteProject(7)).resolves.toEqual(
                {deleted: false, message:"Something went wrong"}
              )
            expect(falsyDeleteProjectSpy).toBeCalled();
          })

        })
*/
})
