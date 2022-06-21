# Jira clone Backend 
## Backend service for Jira Clone
### URGENT TODOS
- Project owner attribute fix
### FEATURES TODOS
- REST API : using Nest
    - Entities
        - Project
        - User
        - Issue
        - Comment
    - Services
    - Controllers
### TESTING TODOS
    - Unit test for all entities for each of controllers and services and even entities
- Database creation and linking
- Swagger Documentation creation from API decorators.
  After launching the server via `nest start` you can consult `http://localhost:3000/api/` to get a better idea about the API and its available functionalities
- Data Seeding (fake data generator)
- Application Containerization
    - Separation of Concern : Each major component such as API engine and Database should be hosted in its separate container
