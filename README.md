# Multi-Tenant Task Management Platform

A modern web application for managing tasks across multiple organizations with different user roles (Admin, Manager, Employee).

## Features

### Organization Level
- Secure organization registration and login
- Unique 7-digit organization key generation
- Admin dashboard for organization management

### User Management
- Role-based access control (Admin, Manager, Employee)
- Secure authentication using JWT
- Individual user registration with organization key validation

### Task Management
- Create and assign tasks to employees
- Task categorization and deadline management
- Real-time task status tracking
- Task history and progress monitoring

### User Interface
- Modern, responsive design using Tailwind CSS
- Intuitive navigation and user experience
- Real-time notifications for task updates

## Tech Stack

### Frontend
- React.js with Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- Material-UI components
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- bcrypt for password hashing
- Express Validator for input validation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Multi-Tenant-Task-Management-Platform
```

2. Install Backend Dependencies
```bash
cd Backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../Frontend
npm install
```

4. Set up Environment Variables
Create a `.env` file in the Backend directory with:
```env
PORT=3001
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

### Running the Application

1. Start Backend Server
```bash
cd Backend
npm start
```

2. Start Frontend Development Server
```bash
cd Frontend
npm run dev
```

## Project Structure

### Frontend
```
Frontend/
├── src/
│   ├── Components1/    # Authentication components
│   ├── Components2/    # Dashboard components
│   ├── ReduxStore/     # Redux state management
│   ├── assets/         # Static assets
│   └── main.jsx        # Application entry point
```

### Backend
```
Backend/
├── controllers/    # Request handlers
├── models/         # Database schemas
├── routes/         # API routes
├── services/       # Business logic
├── middlewares/    # Custom middlewares
└── app.js         # Express application
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Ayush