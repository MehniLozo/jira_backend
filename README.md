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
+ Response 200 (application/json)
    Attribute (Board)
```

### Project 

* **Making changes** 
#### `PUT /api/projects/{projectId}`

 <img src="./screenDocs/ProjectUpdate.png" width="200">
 <br>
 <br>

```diff
+ Response 201 (application/json)
     Attribute (Project)
```

<br>

### Issue

* **Issue Creation**
#### `POST /api/projects/{projectId}/issues/`

<img src="./screenDocs/IssueCreation.png" width="200">

<br>

```diff
+ Response 200 (application/json)
     Attribute (Issue)
```
<br>

* **Issue Modification** 

#### `PATCH /api/projects/issues/{issueId}/`

<img src="./screenDocs/IssueModification.png" width="200">

<br>

```diff
+ Response 201 (application/json)
     Attribute (Issue)

```

<br>

* **Issue Removal**
#### `DELETE /api/projects/issues/{issueId}/ `
<img src="./screenDocs/IssueDelete.png" width="200">

<br>

```diff
+ Response 200 (application/json)
     Attributes (array[Issues])
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

<img src="./screenDocs/IssueSearch.png" width="200">

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


