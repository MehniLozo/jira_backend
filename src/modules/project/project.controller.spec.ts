import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ProjectController',() => {
  let projectController: ProjectController;

  beforeEach(async () => {
    let module:TestingModule ;
     module = await Test.createTestingModule({
       controllers: [ProjectController],
       providers:[ProjectService],
    }).compile()

    projectController= module.get<ProjectController>(ProjectController);

  })

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  })
})
