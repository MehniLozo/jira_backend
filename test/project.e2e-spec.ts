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

//kinda avoided using mocks here
//will use a seperate DB for testing later
describe('Projects', () => {
  let app: INestApplication;
  let projectRepository: Repository<Project>;

  const expectProject = {
    id: 8,
    name: "TestProj",
    url: "testing.com",
    description: "save me here pls",
    category: "business",
    createdAt: "2022-06-28T10:34:54.105Z",
    updatedAt: "2022-06-28T10:34:54.105Z"
  }

  /*let projectService = {
    createProject: () => {},
    getProjectById: (id:number) => {},
    updateProjectById: () => {},
    deleteProject: (id:number) => {}
  }*/

  beforeAll(async() => {
    const moduleRef = await Test.createTestingModule({
      imports:[ProjectModule,TypeOrmModule.forRoot(typeOrmConfig)],
      providers:[ProjectService]
    })
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    projectRepository = moduleRef.get('ProjectRepository');
  })

  describe('/GET projects', () => {
    it('should return the specified project by its id', () => {
     /* await projectRepository.save({
        name: "TestProj",
        url:"testing.com",
        description:"save me here pls",
        category: ProjectCategory.BUSINESS
      });*/
       return request(app.getHttpServer())
      .get('/projects/8')
      //.get('/api/projects/8')
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200) //just at the moment
      .then((res) => {
         expect(res.body).toEqual(expectProject)
      })

      afterAll(async() => {
        await app.close();
      })
    })
  })
})
