import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import TodoSection from "./pages/TodoSection";

const App = () => {
  return (
    <div className="text-slate-50">
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/todo-app" element={<TodoSection />} />
        </Routes>
    </div>
  );
};

export default App;
