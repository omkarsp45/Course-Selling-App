# Course Selling App

## Overview

This is a course-selling application backend built using Node.js, Express, Mongoose, and MongoDB. The backend handles user authentication, course management, and purchases.

The application provides:
- User registration and login
- Admin registration and login
- Course creation by admins
- Course purchase and viewing functionality for users
- Separate routes for users and admins

## Features
- User signup and login
- Admin signup and login
- Users can view all available courses and purchase courses
- Admins can create and manage courses
- Middleware for authentication and authorization
- MongoDB database integration
- Environment variable management using `dotenv`

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/course-selling-app.git
    cd course-selling-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory of the project with the following contents:
    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_USER_PASSWORD = your_password
    JWT_ADMIN_PASSWORD = your_password
    ```

4. **Start the server**:
    ```bash
    node index.js
    ```
   The server will start at `http://localhost:3000`.
