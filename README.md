# MERN Todo App

A simple Todo App built with the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features

- User registration and login functionality with JWT authentication.
- Create, read, update, and delete (CRUD) operations for managing todos.
- Protected routes that require authentication.

## Technologies Used

- **MongoDB**: A NoSQL database for storing user information and todos.
- **Express.js**: A web application framework for building the server-side API.
- **React.js**: A JavaScript library for building the user interface.
- **Node.js**: A JavaScript runtime for executing server-side code.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **WebSocket** (optional): Enables real-time updates without page refresh.

## Prerequisites

Before running the application, make sure you have the following software installed:

- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mern-todo-app.git
   
2. Install dependencies:

   ```bash
   cd mern-todo-app
   npm install

3. Set up environment variables:

 - Create a .env file in the project root directory.
 - Add the following variables to the .env file:

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
 
4. Start the development server:

   ```bash
   npm run dev
   
5. Open your web browser and access the application at http://localhost:3000.


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

    
