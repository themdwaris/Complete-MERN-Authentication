# 🔐 Complete MERN Authentication System

A full-fledged user authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project includes user registration, login, protected routes, and persistent authentication using JWT.

## 🌟 Features

### 🔧 Backend Features

- **User Registration**: Store user credentials securely with hashed passwords using bcryptjs.
- **User Login**: Authenticate users and return JWT tokens.
- **JWT Token Authentication**: Protect routes using middleware that verifies the JWT.
- **User Profile**: Fetch current logged-in user details using the token.
- **Send Email Verification OTP**: Sends a verification OTP to the user's email during registration.
- **Forgot Password**: Allows users to request a password reset link or OTP.
- **Send Forgot Password OTP**: Sends a secure OTP to the user's email to reset their password.
- **Environment Configuration**: Environment variables managed using dotenv.

### 💻 Frontend Features

- **Authentication Forms**: Simple, intuitive React forms for user login and registration.
- **State Management**: React Context API used to manage authentication state.
- **Protected Routes**: Only logged-in users can access certain routes/pages.
- **Persisted Login**: Users remain logged in across sessions using localStorage.
- **Email Verification Prompt**: UI to enter and verify OTP sent to email.
- **Forgot Password Flow**: UI screens to request and confirm password reset using OTP.

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
│   └── pages/           # Login/Register/Profile/ForgotPassword/Verify pages
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
  - Nodemailer (for sending OTPs)

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
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
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
- You will receive OTPs for email verification and password reset in your registered email

## 📬 Contact

For questions, feel free to reach out to [themdwaris](https://github.com/themdwaris).

