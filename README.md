# Jira clone Backend
## Backend service for Jira Clone
### URGENT TODOS
- Fix the RouterModule problem in order to set an hierarchy
- Req/Res unecessary for some request while @Body could've been enough (ex: instead of req.params.id )
- Global project database config
- Global application "Error Handling error"
- Authentication middleware setup "JWT"
- Issue-Search backend operation by a search term kinda like : issues?searchTerm=you can
- Password Hashing


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
