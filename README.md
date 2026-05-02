# Team Task Manager

A professional, full-stack application designed for efficient team coordination, project tracking, and task management. Built with a React frontend and a Python Flask backend connected to a PostgreSQL database.

## Features

- **User Authentication:** Secure registration and login flows.
- **Role-Based Access Control:** Differentiates between 'Admin' and 'Member' roles, ensuring appropriate access levels.
- **Project Management:** Create and organize high-level projects.
- **Task Assignment:** Admins can assign tasks to specific team members.
- **Progress Tracking:** Update task statuses (Pending, In Progress, Completed).
- **Dashboard Interface:** Centralized hub for viewing assigned tasks and monitoring overall project progression.

## Tech Stack

### Frontend
- React.js
- React Router DOM (Navigation)
- Vanilla CSS

### Backend
- Python 3
- Flask (Web Framework)
- Flask-CORS (Cross-Origin Resource Sharing)
- psycopg2 (PostgreSQL adapter)

### Database
- PostgreSQL

## Prerequisites

- Node.js and npm
- Python 3.8+
- PostgreSQL server running locally

## Local Setup

### 1. Database Configuration
1. Ensure your local PostgreSQL server is running.
2. Create a database named `Ethara`.
3. Create the required tables (`users`, `projects`, `tasks`) using the respective schemas.
4. Update the database credentials securely (do not hardcode passwords in production).

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Install the required Python packages (it is recommended to use a virtual environment):
   ```bash
   pip install Flask flask-cors psycopg2
   ```
3. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will run on `http://127.0.0.1:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory.
2. Install the Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend application will be accessible at `http://localhost:3000`.

## Architecture Details

- **RESTful API:** The backend serves data to the frontend via JSON-based REST endpoints (`/login`, `/register`, `/create-task`, `/get-tasks`, etc.).
- **State Management:** The React frontend utilizes standard hooks (`useState`, `useEffect`) and local storage for maintaining session persistence and tracking user roles.

## Deployment (Railway)

This repository is configured for cloud deployment on platforms like Railway. 
- **Backend:** Uses `gunicorn` via the provided `Procfile` and `requirements.txt`. Connects to a cloud PostgreSQL database.
- **Frontend:** Automatically uses the `REACT_APP_API_URL` environment variable to communicate with the live backend, falling back to localhost during local development.
