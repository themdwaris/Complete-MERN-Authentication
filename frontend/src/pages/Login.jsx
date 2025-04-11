import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import Loader from "../components/Loader";
import { useYourContext } from "../context/AppContext";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const { loading, setLoading, backendURL, navigate,getUserData,setIsLoggedIn,loginState, setLoginState } = useYourContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      //**********Register
      if (loginState === "register") {
        setLoading(true);
        axios.defaults.withCredentials = true;
        const res = await axios.post(
          `${backendURL}/api/auth/register`,
          formData
        );
        if (res?.data?.success) {
          toast.success("Sign Up Successfull");
          // setLoginState("login");
          navigate("/email-verify")
          setLoading(false);
          setFormData({
            name: "",
            email: "",
            password: "",
          })
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }

      } else {
        setLoading(true);
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${backendURL}/api/auth/login`, formData);
        if (res?.data?.success) {
          toast.success("Login Successfull");
          getUserData()
          setIsLoggedIn(true)
          navigate("/");
          setLoading(false);
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log("Failed to register:", error);
    }
  };
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="h-screen bg-gradient-to-r from-purple-600 to-indigo-400 flex items-center justify-center px-5">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-[400px] mx-auto px-5 pb-10 rounded-xl bg-gray-950"
      >
        <h1 className="text-3xl font-medium text-center py-8">
          {loginState === "register" ? "Create Account" : "Sign In"}
          <p className="text-sm font-normal py-2 bg-gradient-to-l from-purple-600 to-indigo-400 block text-transparent bg-clip-text">
            {loginState === "register"
              ? "Welcome to our app"
              : "Welcome back to our app"}
          </p>
        </h1>
        <div className="w-full px-4 flex flex-col gap-4">
          {loginState === "register" && (
            <div className="w-full flex items-center gap-2 rounded-full bg-white/15 py-2 px-4 overflow-hidden">
              <span className="text-white/60">
                <FaUserAlt size={16} />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={inputHandler}
                required
                autoFocus
                placeholder="Name"
                className="w-full outline-none border-none px-2 bg-transparent text-white placeholder:text-white/60"
              />
            </div>
          )}
          <div className="w-full flex items-center gap-2 rounded-full bg-white/15 py-2 px-4 overflow-hidden">
            <span className="text-white/60">
              <IoMail size={16} />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={inputHandler}
              required
              autoFocus
              placeholder="Email"
              className="w-full outline-none border-none px-2 bg-transparent text-white placeholder:text-white/60"
            />
          </div>
          <div className="w-full flex items-center gap-2 rounded-full bg-white/15 py-2 px-4 overflow-hidden">
            <span className="text-white/60">
              <RiLockPasswordFill size={16} />
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={inputHandler}
              required
              placeholder="Password"
              className="w-full outline-none border-none px-2 bg-transparent text-white placeholder:text-white/60"
            />
          </div>
          {loginState === "login" && (
            <p className="text-sm cursor-pointer bg-gradient-to-l from-purple-600 to-indigo-400 inline-block text-transparent bg-clip-text" onClick={()=>navigate("/reset-password")}>
              Forget password
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-gradient-to-l from-purple-600 to-indigo-400 text-white cursor-pointer rounded-full w-full mt-5 flex items-center gap-3 justify-center transition transform active:scale-90 ${
              loading && "opacity-50"
            }`}
          >
            <span>{loginState === "register" ? "Sign Up" : "Login"}</span>
            {loading && <Loader />}
          </button>
        </div>
        {loginState === "register" ? (
          <p className="text-sm text-center text-white/70 mt-5">
            Already have an account ?
            <span
              className="text-sm cursor-pointer bg-gradient-to-l from-purple-600 to-indigo-400 inline-block text-transparent bg-clip-text"
              onClick={() => setLoginState("login")}
            >
              &nbsp;Login
            </span>
          </p>
        ) : (
          <p className="text-sm text-center text-white/70 mt-5">
            Don't have an account ?
            <span
              className="text-sm cursor-pointer bg-gradient-to-l from-purple-600 to-indigo-400 inline-block text-transparent bg-clip-text"
              onClick={() => setLoginState("register")}
            >
              &nbsp;Register
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
