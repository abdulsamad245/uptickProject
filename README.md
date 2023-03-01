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

## API Endpoints
The following endpoints are available:

## PUT /register/
Register a user

```json
   {
    "title": "Updated Note Title",
    "content": "Updated Note Content"
   }
```



## Built With

* React
* TMDB API
* Axios
* React Router

### Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## License
This project is licensed under the MIT License
