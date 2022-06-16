# Jira clone Backend 
# API Documentation

## Login 
## About 
### `GET /api/about` 

<img src="./screenDocs/about.png" width="200">

<br>
<br>

### Project's board (aka Home page for the project) 

#### `GET /api/{projectId}/board`

<img src="./screenDocs/board.png" width="200">

<br>

```diff
Parameters: 
    Path : projectId
    Body : None

Responses:
+ 200 (application/json)
    Attribute (Board)
- 404 Project not found
```

### Project 

* **Making changes** 
#### `PUT /api/projects/{projectId}`

 <img src="./screenDocs/ProjectUpdate.png" width="200">
 <br>
 <br>

```diff
Parameters:
    Path: projectId
    Body: 
        Project
            name	string
            description	string
            category	string
            url	string
Responses:
+  201 (application/json)
     Attribute (Project)
- 404 Project not found
- 405	Invalid input
```

<br>

### Issue

* **Issue Consulting**
#### `GET /api/projects/issues/{issueId}/`

<img src="./screenDocs/IssueConsulting.png" width="200">

<br>

```diff
Parameters:
    Path : issueId
Responses:
+ 200 (application/json)
    Attribute (Issue)
- 404 Issue doesn't exist


```
<br>

* **Issue Creation**
#### `POST /api/projects/{projectId}/issues/`

<img src="./screenDocs/IssueCreation.png" width="200">

<br>

```diff
Parameters:
    Path: projectId
    Body: Issue
Responses:
+ 200 (application/json)
    Attribute (Issue)
- 400 Something's wrong
- 405 Project's couldn't be saved
```
<br>

* **Issue Modification** 

#### `PATCH /api/projects/issues/{issueId}/`

<img src="./screenDocs/IssueModification.png" width="200">

<br>

```diff
Parameters:
    Path: issueId
    Body: Issue
Responses:
+ 201 (application/json)
     Attribute (Issue)
- 404: Issue doesn't exist
- 405: Something's wrong with the input

```

<br>

* **Issue Removal**
#### `DELETE /api/projects/issues/{issueId}/ `
<img src="./screenDocs/IssueDelete.png" width="200">

<br>

```diff
+ Response 200 (application/json)
```
* **Issue Search** 

#### ` GET /api/projects/{projectId}/issues/search`

<img src="./screenDocs/IssueSearch.png" width="200">

<br>

```diff
+ Response 200 (application/json)
     Attributes (array[Issues])
```


### Comment
<br>

* **Commment Addition**

#### `POST /api/issues/{issueId}/comment `

<img src="./screenDocs/CommentAddition.png" width="200">

<br>

```diff
+ Response 200 (application/json)
     Attributes (Comment)
```

<br>

* **Commment Modification**


#### `PUT /api/issues/{issueId}/comments/{commentId} `

<img src="./screenDocs/IssueModification.png" width="200">

<br>

```diff
+ Response 200 (application/json)
     Attributes (Comment)

```


<br>

* **Comment Removal**



#### ` DELETE /api/issue/comment{commentId}`

<img src="./screenDocs/CommentDeletion.png" width="200">

<br>

```diff
+ Response 200 OK

```


