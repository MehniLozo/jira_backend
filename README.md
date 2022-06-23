# Jira clone Backend
## Backend service for Jira Clone
### URGENT TODOS
- Jira clone UI fixing & trouble shooting
- Project owner attribute fix
- Controllers unit testing
- Equality of mocked project in the controller testing
- Better universal way to catch errors during requests

### Architecture TODOS

REST API :
- [x] Project
  - [x] controllers
    - [x] Unit Test
  - [x] services
    - [x] Unit Test
- [ ] User
  - [x] controllers
    - [ ] unit test
  - [x] services
    - [ ] unit test
- [x] Issue
  - [x] controllers
    - [ ] unit test
  - [x] services
    - [ ] unit test
- [x] Comment
  - [x] controllers
    - [ ] unit test
  - [x] services
    - [ ] unit test

- [ ] End-2-End Testing (Integration test)
- [x] Database creation and linking
- [ ] Data Seeding (fake data generator)
- [ ] Application Containerization
    - Separation of Concern : Each major component such as API engine and Database should be hosted in its separate container
