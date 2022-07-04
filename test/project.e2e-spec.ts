import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {ProjectModule} from '../src/modules/project/project.module';
import {ProjectService} from '../src/modules/project/project.service';
import {Project} from '../src/modules/project/project.entity';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProjectCategory} from '../src/modules/project/project.constants';
require('dotenv').config();

describe('Projects', () => {
  let app: INestApplication;
  let projectRepository: Repository<Project>;

  /*const expectProject = {
    id: 8,
    name: "TestProj",
    url: "testing.com",
    description: "save me here pls",
    category: "business",
    createdAt: "2022-06-28T10:34:54.105Z",
    updatedAt: "2022-06-28T10:34:54.105Z"
  }*/

  beforeAll(async() => {
    const moduleRef = await Test.createTestingModule({
      imports:[ProjectModule,/*TypeOrmModule.forRoot(typeOrmTestConfig)*/
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_TEST_NAME,
          entities: ['./**/*.entity.ts'],
          synchronize: false,
        })
    ,],
      providers:[ProjectService]
    })
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    projectRepository = moduleRef.get('ProjectRepository');
  })

  /*afterEach(async () => {
      await projectRepository.query(`DELETE FROM projects;`);
  });*/

  afterAll(async() => {
    await app.close();
  })

  describe('/GET projects', () => {
    it('should return the specified project by its id', async () => {
      /*await projectRepository.save({
        name: "TestProj",
        url:"testing.com",
        description:"save me here pls",
        category: ProjectCategory.BUSINESS
      });*/
       return request(app.getHttpServer())
      .get('/projects/4')
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      /*.then((res) => {
         expect(res.body).toEqual([{id:expect.any(Number),
           name:"TestProj",
           url:"testing.com",
           description:"save me here pls",
           category: ProjectCategory.BUSINESS
         }])
      })*/
    })
  })
})
