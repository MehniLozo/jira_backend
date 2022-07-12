# Jira clone Backend
## Backend service for Jira Clone
### Issues
- Meeting a problem with hashing https://github.com/typeorm/typeorm/issues/8706
  The password is not fully supported with the @BeforeInsert decorator
- Global Authorization screws login's own authentication
- Router module problem
### Functionalities TODOS
- Exception filters
- Global project database config
- Issue-Search backend operation by a search term kinda like : issues?searchTerm=you can
- issues_users updating
- Error handling logger
### API TODOS

REST API :
- [x] Project
  - [x] controllers
    - [x] Unit Test
  - [x] services
    - [x] Unit Test
  - [ ] E2E Testing

- [ ] User
  - [x] controllers
    - [ ] unit test
  - [x] services
    - [ ] unit test
  - [ ] E2E Testing

- [x] Issue
  - [x] controllers
    - [x] unit test
  - [x] services
    - [x] unit test
  - [ ] E2E Testing

- [x] Comment
  - [x] controllers
    - [x] unit test
  - [x] services
    - [x] unit test
  - [ ] E2E Testing

- [ ] App End-2-End Testing (Integration test)
- [x] Database creation and linking
- [ ] Data Seeding (fake data generator)
- [ ] Application Containerization
    - Separation of Concern : Each major component such as API engine and Database should be hosted in its separate container
