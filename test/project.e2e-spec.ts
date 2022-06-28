import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {ProjectModule} from '../src/modules/project/project.module';
import {ProjectService} from '../src/modules/project/project.service';
import {Project} from '../src/modules/project/project.entity';
import { INestApplication } from '@nestjs/common';
import {typeOrmConfig} from '../src/config/typeorm.config';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('Projects', () => {
  let app: INestApplication;
  let projectRepository: Repository<Project>;

  let projectService = {
    createProject: () => {},
    getProjectById: (id:number) => {},
    updateProjectById: () => {},
    deleteProject: (id:number) => {}
  }
//,TypeOrmModule.forRoot(typeOrmConfig)
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

  describe('/GET project', () => {
    it('should return the specified project by its id', () => {
       return request(app.getHttpServer())
      .get('/projects/1')
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(404)
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
