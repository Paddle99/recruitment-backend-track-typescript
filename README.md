# Invoice Management API

A comprehensive and robust RESTful API for managing users, tax profiles, and invoices, built with Node.js, Express, and TypeScript. The project follows a solid MVC architecture, integrates a modern ORM, and includes a fully containerized development and production environment with Docker.

## Project Overview

This application was developed for a Backend Developer recruitment track and meets all the specified criteria.

- **Backend Technologies**: Node, Express, and TypeScript.
    
- **Database & ORM**: Uses **PostgreSQL** as the relational database and **Prisma** as the ORM for database management and migrations.
    
- **Architecture**: The server is structured using an **MVC (Model-View-Controller) architecture** and the **Repository Pattern**, and other common design patterns, ensuring clean, modular, and maintainable code.
    
- **Data Validation**: Data Transfer Objects (DTOs) are defined using the **Zod** library, which provides strong typing and input data validation.
    
- **API Documentation**: The API is fully documented with an **OpenAPI** schema automatically generated from Zod using `zod-to-openapi`.
    
- **Middleware**: Custom middleware has been implemented for input data validation, API authentication, and centralized error handling.
    
- **Testing**: The entire project is covered by unit and integration tests written with **Vitest**, with the ability to check code coverage.
    
- **Containerization**: The application is fully containerized using Docker and Docker Compose for a quick and reproducible setup.
    

---

## Prerequisites

Ensure you have Docker and Docker Compose installed on your system.

---

## Getting Started

### 1. Cloning the Repository

```Bash
git clone https://github.com/Paddle99/recruitment-backend-track-typescript.git 
cd recruitment-backend-track-typescript
```

### 2. Starting the Docker Environment

This command will start the database (PostgreSQL), backend, and Nginx server containers. The `--build` option is necessary to create the backend image from the Dockerfile.

```Bash
docker-compose up --build
```

### 3. Database Migrations and Seeding

Once the containers are running, execute the migrations to create the tables in the database. The `docker-compose exec backend ...` command runs commands inside the backend container.

```Bash
docker-compose exec backend npx prisma migrate deploy 
docker-compose exec backend npm run seed
```

then you can test the api by creating a new user and then calling the login api to retrieve the token that you can use yourself to test all the other api endpoints.

```Bash
# Test the API by creating a user
curl -X POST http://localhost/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mario.rossi@example.com",
    "password": "P@ssw0rd123",
    "firstName": "Mario",
    "lastName": "Rossi"
  }'

# Login with the created user to get a JWT token
curl -X POST http://localhost/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mario.rossi@example.com",
    "password": "P@ssw0rd123"
  }'
```
### 4. Exploring and Testing the APIs

The API is exposed via Nginx at `http://localhost`. You can access the OpenAPI documentation to explore all endpoints.

---

## NPM Scripts

Here is a list of the main scripts available in `package.json` and a brief explanation of their use.

- `npm run dev`: Starts the server in development mode with `tsx watch`, which automatically reloads the server on code changes.
    
- `npm run build`: Compiles the TypeScript code into JavaScript and creates a `dist` folder.
    
- `npm run start`: Starts the server in production mode using the compiled code from the `dist` folder.
    
- `npm run lint` & `npm run lint:fix`: Run the linter (ESLint) to check for code errors and, in the case of `lint:fix`, automatically fix them.
    
- `npm run format` & `npm run format:check`: Run Prettier to format the code according to established conventions.
    
- `npm run seed`: Executes the seeding script to populate the database with sample data.
    
- `npm run test`: Runs all unit and integration tests with Vitest.
    
- `npm run test:integration`: Runs only the integration tests.
    
- `npm run test:coverage`: Runs the tests and generates a code coverage report.
    

---

## Project Structure

Your project's directory structure is well-organized, following a layered architecture with the **Repository Pattern**.

- `prisma`: This folder manages everything related to your database and the **Prisma** ORM, including schema definition and migrations.
    
- `controllers`: These files handle incoming HTTP requests and delegate the business logic to the services. They are the first point of contact for API requests.
    
- `db/repositories`: This is where your **repositories** are located. Each repository file (e.g., `InvoiceRepository.ts`) encapsulates the logic for interacting with a specific database resource, abstracting the data layer from the business logic.
    
- `docs`: Contains the API documentation, which is likely generated in the OpenAPI format.
    
- `middlewares`: This directory holds custom middleware for your application, such as those for authentication, data validation (using Zod), or centralized error handling.
    
- `models/dto`: This folder is used for **Data Transfer Objects (DTOs)**. DTOs define the structure of data entering and leaving the API, and they are essential for validation and ensuring type safety.
    
- `routes`: These files define the API endpoints and associate URLs with their corresponding controllers.
    
- `services`: Contains the application's **business logic**. Services are called by controllers and, in turn, use repositories to perform data manipulation.
    
- `tests`: This folder is dedicated to testing, with sub-directories for unit tests (`unit`), integration tests (`integration`), and test data (`fixtures`).
    
- `index.ts`: This is the **entry point** of the entire application. It's the main file that starts the server instance.
    
- `server.ts`: This file likely contains the main `Server` class, which handles the core configuration of the Express application, including setting up middleware and registering routes.