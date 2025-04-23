# 🔐 Complete MERN Authentication System

A full-fledged user authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project includes user registration, login, protected routes, and persistent authentication using JWT.

## 🌟 Features

### 🔧 Backend Features

- **User Registration**: Store user credentials securely with hashed passwords using bcryptjs.
- **User Login**: Authenticate users and return JWT tokens.
- **JWT Token Authentication**: Protect routes using middleware that verifies the JWT.
- **User Profile**: Fetch current logged-in user details using the token.
- **Environment Configuration**: Environment variables managed using dotenv.

### 💻 Frontend Features

- **Authentication Forms**: Simple, intuitive React forms for user login and registration.
- **State Management**: React Context API used to manage authentication state.
- **Protected Routes**: Only logged-in users can access certain routes/pages.
- **Persisted Login**: Users remain logged in across sessions using localStorage.

## 📁 Folder Structure

```
Complete-MERN-Authentication/
├── backend/             # Express.js server
│   ├── config/          # MongoDB connection config
│   ├── controllers/     # Auth logic handlers
│   ├── middleware/      # JWT middleware
│   ├── models/          # Mongoose schemas
│   └── routes/          # API routes
├── frontend/            # React client app
│   ├── components/      # Reusable React components
│   ├── context/         # Auth context
│   └── pages/           # Login/Register/Profile pages
└── README.md
```

## 🛠️ Technologies Used

- **Frontend**:
  - React.js
  - React Router DOM
  - Axios

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose

- **Authentication**:
  - JSON Web Tokens (JWT)
  - bcryptjs

- **Others**:
  - dotenv
  - cors

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running (local or MongoDB Atlas)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/themdwaris/Complete-MERN-Authentication.git
cd Complete-MERN-Authentication
```

2. **Backend Setup**

```bash
cd backend
npm install
```

- Create a `.env` file with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

- Start the backend server:

```bash
npm start
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install
```

- Run the frontend development server:

```bash
npm start
```

### Accessing the App

- Open `http://localhost:3000` to view the React app
- Register a new account or login with existing credentials

## 📬 Contact

For questions, feel free to reach out to [themdwaris](https://github.com/themdwaris).

