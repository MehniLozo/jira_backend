import { Repository } from 'typeorm';

// @ts-ignore
export const repositoryMockFactory: () => Repository<any> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  // ...
}));
