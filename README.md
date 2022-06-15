# Jira clone Backend 
## API Documentation

### Login 
### About 
 `GET /api/about`
![Api info](./screenDocs/about.png)

### Project's board (aka Home page for the project) \

`GET /api/{projectId}/board`

### Project 
* **Making changes** \ 
`PUT /api/projects/{projectId}`
![Modifying project](./screenDocs/ProjectUpdate.png)
### Issue
* **Issue Creation** \
 `POST /api/projects/{projectId}/issues/`
![Create new Issue](./screenDocs/IssueCreation.png)

* **Issue Modification** \
 `PUT /api/projects/{projectId}/issues/`
![Modify Issue](./screenDocs/IssueModification.png)

* **Issue Search** \
` GET /api/projects/{projectId}/issues/search`
![Search an Issue](./screenDocs/IssueSearch.png)


