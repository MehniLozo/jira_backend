# Jira clone Backend 
## API Documentation

### Login 
### About 
 `GET /api/about` 
![Api info](./screenDocs/about.png)

### Project's board (aka Home page for the project) 

`GET /api/{projectId}/board`

### Project 
\s\s
* **Making changes** 
`PUT /api/projects/{projectId}`
\s\s
![Modifying project](./screenDocs/ProjectUpdate.png)
### Issue
\s\s
* **Issue Creation**
 `POST /api/projects/{projectId}/issues/`
\s\s
![Create new Issue](./screenDocs/IssueCreation.png)

* **Issue Modification** 
 `PUT /api/projects/{projectId}/issues/`
\s\s
![Modify Issue](./screenDocs/IssueModification.png)

* **Issue Search** 
` GET /api/projects/{projectId}/issues/search`
\s\s
![Search an Issue](./screenDocs/IssueSearch.png)


