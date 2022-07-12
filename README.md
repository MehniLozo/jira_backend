# Jira clone Backend
## Backend service for Jira Clone
### URGENT TODOS
- Authentication middleware setup "JWT"
- Password Hashing
- Exception filters
- Fix the RouterModule problem in order to set an hierarchy
- Global project database config
- Issue-Search backend operation by a search term kinda like : issues?searchTerm=you can
- issues_users updating

### Functionalities TODOS
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
# More Documentations 
[Click here for swagger and Schema documentation](https://drive.google.com/file/d/11UuR15HyuspsOANuSJ-Iro39MVKdhEAe/view?usp=sharing).