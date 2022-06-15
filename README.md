# Jira clone Backend 
## Backend service for Jira Clone
### TODO
- REST API : using Nest
    - Entities
        - Project
        - User
        - Issue
        - Comment
    - Services
    - Controllers
- Database creation and linking
- Swagger Documentation creation from API decorators.
  After launching the server via `nest start` you can consult `http://localhost:3000/api/` to get a better idea about the API and its available functionalities
- Data Seeding (fake data generator)
- Application Containerization
    - Separation of Concern : Each major component such as API engine and Database should be hosted in its separate container
