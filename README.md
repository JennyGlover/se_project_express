# WTWR (What to Wear?): Back End

## Description of the Project and Its Functionality

The WTWR back-end project focuses on creating a robust server to power the What to Wear application. The server is designed to handle user data, manage a database of clothing items, and provide secure API endpoints for interaction. This includes implementing user authentication and authorization to ensure only authorized users can access or modify data.

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
- **Winston**: Logger library to track requests, errors, and general activity within the application
- **JWT (JSON Web Tokens)**:For secure, stateless authentication.

### Techniques

- **RESTful API**: Developed with REST principles to ensure clean and scalable API routes.
- **User Authentication**: Hashing passwords using bcrypt, and managing sessions with JWT.
- **Error Handling Middleware**: Centralized error handling to ensure consistent responses for failed requests.
- **Input Validation**: Using **Joi** and **Celebrate** for validating user input and preventing malicious data.
- **PM2**: Process manager for keeping the application running and automatically restarting it upon failure.
- **nginx**: Reverse proxy and load balancing for deployment.
- **SSL Encryption**: For securing communications with an SSL certificate.

## Running the Project

`npm run start` — to launch the server
`npm run dev` — to launch the server with the hot reload feature

**Link to Project FrontEnd**
[**se_project_REACT**](https://github.com/JennyGlover/se_project_react)

You can access the live application at [https://www.whattoweartoday.crabdance.com/](https://www.whattoweartoday.crabdance.com/)
