# Jira clone Backend 
# API Documentation

## Login 
## About 
### `GET /api/about` 
![Api info](./screenDocs/about.png)

### Project's board (aka Home page for the project) 

### `GET /api/{projectId}/board`
+ Response 200 (application/json)
    + Attribute (Board)
### Project 

* **Making changes** 
### `PUT /api/projects/{projectId}`

![Modifying project](./screenDocs/ProjectUpdate.png)

+ Response 201 (application/json)
    + Attribute (Project)
### Issue

* **Issue Creation**
### `POST /api/projects/{projectId}/issues/`

![Create new Issue](./screenDocs/IssueCreation.png)

+ Response 200 (application/json)
    + Attribute (Issue)

* **Issue Modification** 
### `PATCH /api/projects/issues/{issueId}/`

![Modify Issue](./screenDocs/IssueModification.png)

+ Response 201 (application/json)
    + Attribute (Issue)

* **Issue Removal**
### `DELETE /api/projects/issues/{issueId}/ `
![Modify Issue](./screenDocs/IssueDelete.png)

    

* **Issue Search** 
### ` GET /api/projects/{projectId}/issues/search`

![Search an Issue](./screenDocs/IssueSearch.png)

+ Response 200 (application/json)
    + Attributes (array[Issues])


