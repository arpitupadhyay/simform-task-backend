# Simform Backend CRUD APIs

- A login/register/get api to authenticate user.

# How to go up and running

- ### Local env

  1. Clone this repo
  2. go to folder

  ```sh
  cd backend
  ```

  3. **Important step**: In `.env` file define NODE_ENV & PORT

  ```
  NODE_ENV=dev
  PORT=4000
  ```

  4. install packages

  ```sh
  npm install
  ```

  5. run the server

  ```sh
  npm run start
  ```

  - once started, server is running on [http://localhost:4000](http://localhost:4000)

# API Endpoints

| Endpoint               | Method | Payload                                  | Response                           | Requirements                     | Description                          |
| ---------------------- | ------ | ---------------------------------------- | ---------------------------------- | -------------------------------- | ------------------------------------ |
| /accounts/register     | POST   | { firstName, lastName, email, Password } | { message }                        | `password` must have 6 digit     | Register API                         |
| /accounts/login        | POST   | {email, password}                        | { userInfo, jwtToken, timeStamps } | Form fields can't be blank       | authenticate user and sign jwt token |
| /accounts/user-details | GET    | Header: `Authorization=Bearer jwttoken`  | { userInfo }                       | Need to pass Authorization token | Get user info by jwt token           |
| /accounts/{:userId}    | GET    | Header: `Authorization=Bearer jwttoken`  | { userInfo }                       | Need to pass Authorization token | Get user info by UserId              |
| /accounts/{:userId}    | PUT    | Header: `Authorization=Bearer jwttoken`  | { updatedFields }                  | Need to pass Authorization token | Update user info by userId           |

# Additional Features

| Endpoint           | Method | Payload                                 | Response    | Requirements                     | Description                   |
| ------------------ | ------ | --------------------------------------- | ----------- | -------------------------------- | ----------------------------- |
| /accounts/{userId} | DELETE | Header: `Authorization=Bearer jwttoken` | { message } | Need to pass Authorization token | Delete the user from database |

# Project Structure

- **app.js** - Main express app initialization
- **\_helpers** - Helpers file for APIs
  - **db.js** - Establish connection with mongodb.
- **\_middlewares**

  - **authorize.js** - Authorize the user
  - **error-handler.js** - ErrorHandler for Express. Handles Validation and unauthorized errors.
  - **validate-request.js** - Validates the request inputs.

- **accounts**

  - **account.model.js** - Defined accounts mongoose model.
  - **account.service.js** - Service to pass the data easily from any routes & hash the passwords.
    = **account.controller.js** - Express request handlers for register, login and update user.

- **.env** - Environment variables to use throughout the server

# Additional

- A postman requests collection is provided with the filename `simform_apis.postman_collection.json`

# Author

Arpit Upadhyay (@arpitupadhyay).
