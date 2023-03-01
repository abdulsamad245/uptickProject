# CRUD Notes API
This is a simple CRUD (Create, Read, Update, Delete) API for notes. It allows users to register, login, reset password, logout, create, read, update and delete notes via HTTP requests..

## Demo
Use https://crud-notes-api.onrender.com/ as base url for live demo.

## Getting Started
Follow these instructions to get the API up and running on your local machine for development and testing purposes.

## Prerequisites
To run this app, you will need the following installed on your system:

* Node.js (v14 or higher)
* npm (v6 or higher)

## Installation
To build and run this you will need [Node.js](https://nodejs.org/en/) and npm installed.

* Clone the repositry
* install the dependencies, enter the directory and run ```npm install```
* Create a .env file at the root of the project.
* Replace DATABASE with your mongodb uri string.
* Replace JWT_SECRET with your secret key.
* Replace PORT with any free port on your machine.
* Start the app. run ````npm start```. This will start the app on http://localhost:PORT.

## Base URL
```https://example.com/api/v1/``` (Notes)
```https://example.com/api/auth/``` (Users)

```https://crud-notes-api.onrender.com/api/v1```
```https://crud-notes-api.onrender.com/api/auth```

## Authentication
All endpoints, except the /login and /register endpoints, require authentication. To authenticate, send a POST request to the /login endpoint with a valid email and password. The server will respond with an access token, which should be included in the headers of subsequent requests:

```Authorization: Bearer <access_token>```


## API Endpoints
The following endpoints are available:

## POST /register
Register a user

```json
   {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@gmail.com",
    "password": "pass123",
    "passwordConfirm: "pass123"
   }
```

## POST /login
Login a user

```json
   {
    "email": "john@gmail.com",
    "password": "pass123"
   }
```

## POST /password-reset
Reset a user's password

```json
   {
    "newPassword": "pass123"
   }
```


## GET /logout
Logout a user

## POST /note
Create a note

```json
   {
      "title": "Title 1",
      "text": "A new note 1"
   }
```

## GET /note/list
Read all notes

## GET /note/:id
Read a note by id

``` /note/1```

## PUT /note/:id
Update a note by id

``` /note/1```

```json
   {
      "title": "An updated title",
      "text": "An updated text"
   }
```

## DELETE /note/:id
Delete a note by id

``` /note/1```


## Built With

* Node.js
* Express
* Mongoose

## License
This project is licensed under the MIT License
