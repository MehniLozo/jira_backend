# Jira clone Backend
## Backend service for Jira Clone
### Issues
- Caching problem : 
    - Each user should have his own JWT secret verifier key and gonna be stored in his row
    - Update user cache inside of Redis while updating users or its projects aka Dynamic caching

- Make session registeration inside mysql DB
- Issue searching with pagination ; Load only the first 10 issues
- Issue search indexes ?? automatic index upload instead of manually inserting them
- Unit tests fix
- issues_users updating
- Validate the containerization and do the merge Feature + Arch
    - DB in its own container pls
### Functionalities TODOS
- Store Sessions for multiple devices of users
- Email sender to specific people who are concerned with a specific issue
  Basically,if these members are included in assignee or as reporter role they would get noticed about any changes happened to their issue , whether that is a change of state, description , comments etc...
- More in depth issue's search engine technique which implements scoring system for later sorting purposes.
- Better Logger
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
