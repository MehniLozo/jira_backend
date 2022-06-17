import { Test, TestingModule } from '@nestjs/testing';
import {Project} from './project.entity';
import {ProjectService} from './project.service';

describe('ProjectService', () => {
  let projectService: ProjectService;

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService],
    }).compile();

    projectService = module.get<ProjectService>(ProjectService);
  })

  it('Should be defined', () => {
    expect(projectService).toBeDefined();
  })

})
