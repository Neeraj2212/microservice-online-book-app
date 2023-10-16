# Low-Level Design Document: Online Content Microservice Project

## Table of Contents
- [Low-Level Design Document: Online Content Microservice Project](#low-level-design-document-online-content-microservice-project)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
  - [2. API Documentation](#2-api-documentation)
  - [3. Microservice: User service](#3-microservice-user-service)
    - [3.1. Database Design](#31-database-design)
    - [3.2. API Design](#32-api-design)
  - [4. Microservice: Content service](#4-microservice-content-service)
    - [4.1. Database Design](#41-database-design)
    - [4.2. API Design](#42-api-design)
  - [5. Microservice: Interaction service](#5-microservice-interaction-service)
    - [5.1. Database Design](#51-database-design)
    - [5.2. API Design](#52-api-design)
  - [6. Nginx Reverse Proxy](#6-nginx-reverse-proxy)
  - [7. Docker Compose](#7-docker-compose)


## 1. Introduction
This document aims to provide a low-level design for the Online Content Microservice Project. The project follows the microservices architecture and uses Docker for containerization. Each microservice has its own dedicated database.

## 2. API Documentation
API documentation is available in the following formats:

Postman Collection :- [Postman Collection](https://www.postman.com/interstellar-firefly-437250/workspace/micorservice-online-book-app/collection/16239037-da59a8d9-7f34-42f7-9084-ad5079fab0b6?action=share&creator=16239037)

Swagger Documentation :- [Swagger Documentation](https://app.swaggerhub.com/apis-docs/N78844/microservice-book-app/1.0)

Postman Documentation :- [Postman Documentation](https://documenter.getpostman.com/view/16239037/Tz5qZ9QJ)

## 3. Microservice: User service
The user service manages user data and offers CRUD operations for user profiles.

### 3.1. Database Design
The user service uses a MongoDB database to store user data. The database is containerized using Docker.

The database schema is as follows:
```typescript
{
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    description: "Unique identifier for the user",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  }
}
```

### 3.2. API Design
The user service provides RESTful APIs for CRUD operations on users, including first name, last name, email, and phone number. It also provides an API to generate an authentication token for users.

Check Postman collection and documentation for more details. 

The API endpoints are as follows:

`POST /user/`

- **Description**: Create a new user.
- **Request body**:
```typescript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
}
```
- **Responses**:
  - **201**: User created successfully.
    ```typescript
    {
      data: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
      },
      message: string,
    }
    
    ```
  - **400**: Invalid Email or Phone Number.
  - **409**: User already exists.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API checks if request body is valid and email and password provided are not in used if not then it creates a new user and returns the user object.

`GET /user/all` 

- **Description**: Get all users.
- **Responses**:
  - **200**: Users fetched successfully.
    ```typescript
    {
      data: [
        {
          _id: string,
          firstName: string,
          lastName: string,
          email: string,
          phone: string,
        },
        ...
      ],
      message: string,
    }
    ```
- **Working**: The API fetches all users from the database and returns them.

`GET /user/:id`

- **Description**: Get a user by id.
- **Responses**:
  - **200**: User fetched successfully.
    ```typescript
    {
      data: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
      },
      message: string,
    }
    ```
  - **404**: User not found.
  - **400**: Invalid user id.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API validates if the user id is correct and then fetches the user with the given id from the database and returns it.

`PUT /user/:id`

- **Description**: Update a user by id.
- **Request body**: Only fields that needs to be updated should be provided.
  ```typescript
  {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
  }
  ```
- **Responses**:
  - **200**: User updated successfully.
    ```typescript
    {
      data: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
      },
      message: string,
    }
    ```
  - **409**: Email id or phone already exists
  - **404**: User not found.
  - **400**: Invalid user id.
    ```typescript
    {
        message: string,
    }
    ```

- **Working**: The API validates if the user id is correct and if email id and phone are provided for updation it verifies that there is no user exists with the email or phone and then updates the user with the given id from the database and returns it.

`DELETE /user/:id`

- **Description**: Delete a user by id.
- **Responses**:
  - **200**: User deleted successfully.
    ```typescript
    {
      data: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
      },
      message: string,
    }
    ```
  - **404**: User not found.
  - **400**: Invalid user id.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API validates if the user id is correct and then deletes the user with the given id from the database and returns the user object.

`GET /user/token/:id` 

- **Description**: Get a user token by user id.
- **Responses**:
  - **200**: User token fetched successfully.
    ```typescript
    {
      data: {
        token: string,
      },
      message: string,
    }
    ```
  - **404**: User not found.
  - **400**: Invalid user id.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API validates if the user id is correct and then fetches the user token with the given id from the database and returns it.


## 4. Microservice: Content service

The content service manages content data and offers CRUD operations for content. It also provides APIs to fetch latest content sorted by date and content that are most popular sorted by reads or likes.

### 4.1. Database Design
The content service uses a MongoDB database to store content data. The database is containerized using Docker.

```typescript
{
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    description: "Unique identifier for the content",
  }
  title: {
    type: String,
    required: true,
    unique: true,
  },
  story: {
    type: String,
    required: true,
  },
  datePublished: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}
```

### 4.2. API Design
The content service provides RESTful APIs for CRUD operations on content, for title and story. It also provides APIs to fetch latest content sorted by date and content that are most popular sorted by reads or likes. And one special api to upload content to the database using csv file.

The API endpoints are as follows:

`POST /content/`

- **Description**: Create a new content.
- **Header**: Requires authentication token in the Authorization header field.
- **Request body**:
```typescript
{
  title: string,
  story: string,
  datePublished: Date // In YYYY-MM-DD format
}
```
- **Responses**:
  - **201**: Content created successfully.
    ```typescript
    {
      data: {
        _id: string,
        title: string,
        story: string,
        datePublished: Date,
        userId: string,
      },
      message: string,
    }
    
    ```
  - **400**: Invalid date format.
  - **404**: Token Not found.
  - **401**: Invalid Token.
  - **409**: Content already exists.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API checks if request body is valid and user with id provided in token exists. it then checks if the title of the book is already used. After validations it creates a new content and returns the content object.

`GET /content/:id`

- **Description**: Get a content by id.
- **Responses**:
  - **200**: Content fetched successfully.
    ```typescript
    {
      data: {
        _id: string,
        title: string,
        story: string,
        datePublished: Date,
        userId: string,
      },
      message: string,
    }
    ```
  - **404**: Content not found.
  - **400**: Invalid content id.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API validates if the content id is correct and then fetches the content with the given id from the database and returns it.

`PUT /content/:id`

- **Description**: Update a content by id.
- **Header**: Requires authentication token in the Authorization header field.
- **Request body**: Only fields that needs to be updated should be provided.
  ```typescript
  {
    title: string,
    story: string
  }
  ```
- Responses:
  - **200**: Content updated successfully.
    ```typescript
    {
      data: {
        _id: string,
        title: string,
        story: string,
        datePublished: Date,
        userId: string,
      },
      message: string,
    }
    ```
  - **404**: Content not found / Token missing.
  - **409**: User is not the owner of the content.
  - **400**: Invalid content id.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API validates if the content id is correct and if user is the owner of the content and then updates the content with the given id from the database and returns it.

`DELETE /content/:id`

- **Description**: Delete a content by id.
- **Header**: Requires authentication token in the Authorization header field.
- **Responses**:
  - **200**: Content deleted successfully.
    ```typescript
    {
      data: {
        _id: string,
        title: string,
        story: string,
        datePublished: Date,
        userId: string,
      },
      message: string,
    }
    ```
  - **404**: Content not found / Token missing.
  - **409**: User is not the owner of the content.
  - **400**: Invalid content id.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API validates if the content id is correct and if user is the owner of the content and then deletes the content with the given id from the database and returns the content object.

`GET /content/new`

- **Description**: Get latest content sorted by date.
- **Responses**:
  - **200**: Content fetched successfully.
    ```typescript
    {
      data: [
        {
          _id: string,
          title: string,
          story: string,
          datePublished: Date,
          userId: string,
        },
        ...
      ],
      message: string,
    }
    ```
- **Working**: The API fetches all content from the database and returns them sorted by date.

`GET /content/top`

- **Description**: Get most popular content sorted by reads or likes.
- **Query Params**: 
  - **sortBy**: read or like
- **Responses**:
  - **200**: Content fetched successfully.
    ```typescript
    {
      data: [
        {
          _id: string,
          title: string,
          story: string,
          datePublished: Date,
          userId: string,
        },
        ...
      ],
      message: string,
    }
    ```
- **Working**: The API calls to the interaction service to fetch all the contentIds sorted by given query and then populates them from the database with 0 interaction content and returns them.

`POST /content/upload`

- **Description**: Upload content to the database using csv file.
- **Header**: Requires authentication token in the Authorization header field.
- **Request body**: 
  - **file**: csv file with title, story and datePublished columns.
- **Responses**:
  - **200**: Content uploaded successfully.
    ```typescript
    {
      data: [
        {
          _id: string,
          title: string,
          story: string,
          datePublished: Date,
          userId: string,
        },
        ...
      ],
      message: string,
    }
    ```
  - **404**: Token Not found.
  - **401**: Invalid Token.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API validates if the user id provided in the token is correct then parse the csv file with the help of `multer` and `csvtojson` packages and then creates a new content for each row in the csv file and returns the content object.

## 5. Microservice: Interaction service
The interaction service manages interaction data and offers record and read operation for interaction. It also provides APIs to fetch most popular content sorted by reads or likes for internal use.

### 5.1. Database Design
```typescript
{
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    description: "Unique identifier for the interaction",
  },
  type: {
    type: String,
    required: true,
    enum: ["read", "like"],
  },
  contentId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}
```

### 5.2. API Design
The interaction service provides RESTful APIs for record and read operations on interaction. It also provides APIs to fetch most popular content sorted by reads or likes for internal use.

The API endpoints are as follows:

`POST /interaction/`

- **Description**: Record a new interaction.
- **Header**: Requires authentication token in the Authorization header field.
- **Request body**:
```typescript
{
  type: string, // read or like
  contentId: string,
}
```
- **Responses**:
  - **201**: Interaction recorded successfully.
    ```typescript
    {
      data: {
        _id: string,
        type: string,
        contentId: string,
        userId: string,
      },
      message: string,
    }
    
    ```
  - **400**: Invalid type.
  - **404**: Token Not found.
  - **401**: Invalid Token.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API checks if request body is valid and user with id provided in token exists. it then checks if the contentId provided is valid. After validations it creates a new interaction and returns the interaction object. If the interaction already exists it updates the interaction.

`GET /interaction/:id`

- **Description**: Get a interaction by id.
- **Responses**:
  - **200**: Interaction fetched successfully.
    ```typescript
    {
      data: {
        _id: string,
        type: string,
        contentId: string,
        userId: string,
      },
      message: string,
    }
    ```
  - **404**: Interaction not found.
  - **400**: Invalid interaction id.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API validates if the interaction id is correct and then fetches the interaction with the given id from the database and returns it.

`GET /interaction/content/:contentId`

- **Description**: Get all interactions for a content.
- **Responses**:
  - **200**: Interactions fetched successfully.
    ```typescript
    {
      reads: number,
      likes: number,
      data: [
        {
          _id: string,
          type: string,
          contentId: string,
          userId: string,
        },
        ...
      ],
      message: string,
    }
    ```
  - **404**: Content not found.
  - **400**: Invalid content id.
    ```typescript
    {
        message: string,
    }
    ```
- **Working**: The API validates if the content id is correct and then fetches all the interactions for the content with the given id from the database and returns them.

`GET /interaction/top`

- **Description**: Get most popular content sorted by reads or likes.
- **Query Params**: 
  - **type**: read or like
- **Responses**:
  - **200**: Content fetched successfully.
  ```typescript
  {
    data: [
      contentIds: string[],
    ],
    message: string,
  }
  ```
- **Working**: The API fetches all the contentIds from the database sorted by given query and returns them by aggregating like and read operations.

## 6. Nginx Reverse Proxy
The nginx reverse proxy is used to route requests to the appropriate microservice. It is containerized using Docker.

It redirect the traffic coming at localhost to the respective microservice.

## 7. Docker Compose
The docker compose file is used to run all the microservices and the nginx reverse proxy. It is also used to run the MongoDB databases for each microservice.