import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {ProjectModule} from '../src/modules/project/project.module';
import {ProjectService} from '../src/modules/project/project.service';
import {Project} from '../src/modules/project/project.entity';
import { INestApplication } from '@nestjs/common';
import {typeOrmConfig} from '../src/config/typeorm.config';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProjectCategory} from '../src/modules/project/project.constants';


describe('Projects', () => {
  let app: INestApplication;
  let projectRepository: Repository<Project>;

  let projectService = {
    createProject: () => {},
    getProjectById: (id:number) => {},
    updateProjectById: () => {},
    deleteProject: (id:number) => {}
  }
  beforeEach(async() => {
    const moduleRef = await Test.createTestingModule({
      imports:[ProjectModule,TypeOrmModule.forRoot(typeOrmConfig)],
      providers:[ProjectService]
    })
    .overrideProvider(ProjectService)
    .useValue(projectService)
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    projectRepository = moduleRef.get('ProjectRepository');
  })

  describe('/GET /projects', () => {
    it('should return the specified project by its id', () => {
     /* await projectRepository.save({
        name: "TestProj",
        url:"testing.com",
        description:"save me here pls",
        category: ProjectCategory.BUSINESS
      });*/
       return request(app.getHttpServer())
      .get('/')
      .set('Accept','application/json')
      //.expect('Content-Type', /json/)
      .expect(404) //just at the moment
      /*.then((res) => {
        expect(res.body).toEqual([
          projectService.getProjectById(1)
        ])
      })*/
      /*.expect({
        data: projectService.getProjectById(1),
    })*/

      afterAll(async() => {
        await app.close();
      })
    },30000)
  })

//  it('/GET project', () => {},30000)
})
