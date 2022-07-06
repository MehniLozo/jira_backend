import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<any>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((input: any): any => input),
    create: jest.fn((input: any): any => input),
    update: jest.fn((input: any): any => input),
    save: jest.fn((input: any): any => input),
    delete: jest.fn((input: any): any => input),
  }),
);
