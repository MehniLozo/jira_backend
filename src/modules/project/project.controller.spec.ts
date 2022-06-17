import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';

describe('ProjectController',() => {
  let projectController: ProjectController;
  let projectService: ProjectService;

  beforeEach(() => {
    projectService = new ProjectService();
    projectController =  new ProjectController(projectService);
  });

  describe('findOne',(id) => {
    it("should return the specified project by ID ", async (id) => {
      const result = ['test'];
      jest.spyOn(projectService,'findOne').mockImplementation(() => result);

      expect(await projectController.findOne(id)).toBe(result);
    })
  })
})
