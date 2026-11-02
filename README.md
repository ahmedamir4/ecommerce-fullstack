A full stack e-commerce project built step by step with Spring Boot, MySQL and React.

## Tech Stack

- **Backend:** Java, Spring Boot, Spring Data JPA, BCrypt
- **Database:** MySQL
- **Frontend:** React (Vite), React Router

## Features

- [x] User sign up (passwords stored hashed with BCrypt)
- [x] User login
- [ ] Products
- [ ] Cart
- [ ] Orders
- [ ] JWT authentication and roles

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in with email and password |

## Run Locally

### Requirements

- Java 17 or newer
- Node.js (LTS)
- MySQL 8

### Database

Create the database in MySQL:

```sql
CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Backend

1. Create a file `backend/local.properties` with your MySQL password:

   ```
   spring.datasource.password=YOUR_PASSWORD
   ```

2. Run:

   ```
   cd backend
   .\mvnw spring-boot:run
   ```

The API runs on `http://localhost:8080`.

### Frontend

```
cd frontend
npm install
npm run dev