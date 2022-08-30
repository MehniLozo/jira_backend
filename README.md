
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

# Jira clone Backend 
# API Documentation

## Login 
## About 
### `GET /api/about` 

<img src="./screenDocs/about.png" width="200">

<br>
<br>

### Project's board (aka Home page for the project) 
Retrieve all issues that are related to the specific project
#### `GET /api/{projectId}/issues`

<img src="./screenDocs/board.png" width="200">

<br>

```diff
Parameters: 
    Path : projectId

Responses:
+ 200 (application/json)
    Attribute (Issue)
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
#### `GET /api/issues/{issueId}/`

<img src="./screenDocs/IssueConsulting.png" width="200">

<br>

```diff
Parameter:
    Path : 
      issueId
Responses:
+ 200 (application/json)
    Attribute (Issue)
- 404 Issue doesn't exist


```
<br>

* **Issue Creation**
#### `POST /api/issues/`

<img src="./screenDocs/IssueCreation.png" width="200">

<br>

```diff
Parameters:
    Path: projectId
    Body: Issue
        title	         string
        type	         Type    
        status	         Status  
        priority         Priority
        description	     string
        reporterId	     integer
        projectId	     integer
Responses:
+ 200 (application/json)
    Attribute (Issue)
- 400 Something's wrong
- 405 Project's couldn't be saved
```
<br>

* **Issue Modification** 

#### `PUT /api/issues/{issueId}/`

<img src="./screenDocs/IssueModification.png" width="200">

<br>

```diff
Parameters:
    Path: 
      issueId
    Body: Issue
Responses:
+ 201 (application/json)
     Attribute (Issue)
- 404: Issue doesn't exist
- 405: Something's wrong with the input

```

<br>

* **Issue Removal**
#### `DELETE /api/issues/{issueId}/ `
<img src="./screenDocs/IssueDelete.png" width="200">

<br>

```diff
Parameter:
    Path: 
      issueId
Responses:
+ 200 Issue has been deleted
- 404 Issue doesn't exist
```
* **Issue Search** 

#### ` GET /api/projects/{projectId}/issues?searchTerm={searchTerm}`

<img src="./screenDocs/IssueSearch.png" width="200">

<br>

```diff
Parameter:
    Path: projectId
    query: searchTerm : string
Responses
+ 200 (application/json)
     Attributes (array[Issues])
- 404 Project doesn't exist
```


### Comment
<br>

* **Commment Addition**

#### `POST /api/comments `

<img src="./screenDocs/CommentAddition.png" width="200">

<br>

```diff
Parameter:
    Path: issueId
    Body: Comment
        body	    string
        userId	    integer
        issueId	    integer
Responses:
+ 200 (application/json)
     Attribute (Comment)
- 404 Issue doesn't exist
```

<br>

* **Commment Modification**


#### `PUT /api/comments/{commentId} `

<img src="./screenDocs/IssueModification.png" width="200">

<br>

```diff
Parameters:
    Path: commentId
    Body: 
      body string
Responses:
+ 200 (application/json)
     Attributes (Comment)
- 404 Comment doesn't exist
- 405 Something went wrong

```


<br>

* **Comment Removal**



#### ` DELETE /api/comments/{commentId}`

<img src="./screenDocs/CommentDeletion.png" width="200">

<br>

```diff
Parameter:
    Path: commentId
Responses
+ 200 OK
- 404 Comment doesn't exist

```
