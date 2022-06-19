import {Project } from './project.entity';

describe('Project class', () => {
  it('should make a project', () => {
    const project = new Project();
    expect(project).toBeTruthy();
  })
})
//More upcoming complex tests 
