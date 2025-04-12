x it# Mood Food Recommendation App

A web application that recommends food based on your current mood and tracks your mood history.

## Features

- User authentication (register/login)
- Mood-based food recommendations
- User mood history tracking
- Personalized food suggestions

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Make sure MongoDB is running on your system

## Configuration

1. The backend server runs on port 5000 by default
2. MongoDB should be running on `mongodb://localhost:27017`

## Running the Application

1. Start the backend server:
   ```bash
   npm run dev
   ```
2. Open the frontend HTML files in a web browser

## API Endpoints

### Authentication
- POST `/api/register` - Register a new user
- POST `/api/login` - Login user

### Mood and Food
- POST `/api/mood` - Get food recommendations based on mood
- GET `/api/history` - Get user's mood history

## Frontend Pages

- `index.html` - Dashboard
- `login.html` - User login
- `register.html` - User registration
- `mood.html` - Mood selection and food recommendations

## Security

- Passwords are hashed using bcrypt
- JWT authentication for API endpoints
- CORS enabled for frontend access