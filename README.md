# WTWR (What to Wear?): Back End

## Description of the Project and Its Functionality

The WTWR back-end project focuses on creating a robust server to power the What to Wea application. The server is designed to handle user data, manage a database of clothing items, and provide secure API endpoints for interaction. This includes implementing user authentication and authorization to ensure only authorized users can access or modify data.

The project enables the following functionalities:

- User registration and login with secure password handling
- API endpoints for managing user profiles and clothing items
- Middleware to handle errors and unknown routes
- Security measures like input validation and safe data handling

## Technologies and Techniques Used

### Technologies

- **Node.js**: For building the back-end server
- **Express.js**: To set up routing and middleware
- **MongoDB**: As the database to store user and clothing item data
- **Mongoose**: For interacting with the database

### Techniques

- **RESTful API**: Built using REST principles for clear and scalable endpoints
- **User Authentication**: Secure handling of user credentials with techniques like hashing
- **Error Handling**: Centralized middleware to manage errors and unknown routes
- **Environment Management**: Using environment variables for configuration
- **Security Best Practices**: Includes input validation and data sanitization
- **Project Structure**: Modular structure with routes, controllers, and utility files

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
