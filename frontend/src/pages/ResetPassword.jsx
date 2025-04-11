import React, { useRef, useState } from "react";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

import Loader from "../components/Loader";
import { useYourContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  axios.defaults.withCredentials=true
  const { loading, setLoading, backendURL, navigate } = useYourContext();
  const [email,setEmail]=useState("")
  const [newPassword,setNewPassword]=useState("")
  const [resetState, setResetState] = useState("email");
  const [otp,setOtp]=useState("")
  const inputRef = useRef([]);
  const [hide,setHide]=useState(false)

  const inputHandler = (e, index) => {
    //Automatically focus next input box
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
    //Automatically focus previous input box
    if (e.target.value.length <= 0 && index < inputRef.current.length) {
      if (index <= 0) return;
      inputRef.current[index - 1].focus();
    }
  };

  const otpHandler=(e)=>{
    e.preventDefault()
    const digits = inputRef.current.map((e) => e.value);
    setOtp(digits.join(""))
    setResetState("newPassword")
  }

  // Pasting copied OTP
  const pasteHandler = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((digit, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = digit;
      }
    });
  };

  const sendResetOtp = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${backendURL}/api/auth/send-reset-otp`,{email})
      if(res?.data?.success){
        toast.success(res?.data?.message)
        setResetState("otp")
        setLoading(false)
      }else{
        setLoading(false)
        toast.error(res?.data?.message)
      }
    } catch (error) {
      setLoading(false)
      toast.error(error?.message)
    }
  }
  const changePasswordHandler=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${backendURL}/api/auth/reset-password`,{email,otp,newPassword})

      if(res?.data?.success){
        toast.success(res?.data?.message)
        navigate("/login")
        setResetState("email")
        setOtp("")
        setEmail("")
        setNewPassword("")
        setLoading(false)
      }else{
        toast.error(res?.data?.message)
        setLoading(false)
      }
    } catch (error) {
       toast.error(error?.message)
       setLoading(false)
    }
  }
  
  return (
    <div className="h-screen bg-gradient-to-r from-purple-600 to-indigo-400 flex items-center justify-center px-5">
      <form onSubmit={resetState==="email"?sendResetOtp:resetState==="otp"?otpHandler:changePasswordHandler} className="w-full max-w-[400px] mx-auto px-5 pb-10 rounded-xl bg-gray-950">
        <h1 className="text-2xl font-medium text-center py-8">
          {resetState === "email"
            ? "Reset Password"
            : resetState === "otp"
            ? "Reset password OTP"
            : "Create new password"}
          <p className="text-sm font-normal py-2 pt-4 bg-gradient-to-l from-purple-600 to-indigo-400 block text-transparent bg-clip-text">
            {resetState === "email"
              ? "Enter your registered email address"
              : resetState === "otp"
              ? "Enter the 6-digit OTP code sent to your email"
              : "Enter or create the new password"}
          </p>
        </h1>
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          {resetState === "email" ? (
            <div className="w-full flex items-center gap-2 rounded-full bg-white/15 py-2 px-4 overflow-hidden">
              <span className="text-white/60">
                <IoMail size={16} />
              </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full outline-none border-none px-2 bg-transparent text-white placeholder:text-white/60"
              />
            </div>
          ) : resetState === "otp" ? (
            <div
              className="flex items-center justify-center gap-2 md:gap-3"
              onPaste={pasteHandler}
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    className="w-full max-w-[40px] h-[40px] rounded bg-white/20 outline-white/70 text-xl font-medium text-center"
                    ref={(e) => (inputRef.current[index] = e)}
                    onInput={(e) => inputHandler(e, index)}
                  />
                ))}
            </div>
          ) : (
            <div className="w-full flex items-center justify-between rounded-full bg-white/15 py-2 px-4 overflow-hidden">
              
                <div className="flex items-center gap-2">
                <span className="text-white/60">
                <RiLockPasswordFill size={16} />
              </span>
              <input
                type={`${hide?"text":"password"}`}
                name="newPassword"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="w-full outline-none border-none px-2 bg-transparent text-white placeholder:text-white/60"
              />
                </div>
              <span className="text-white/60 cursor-pointer leading-3" onClick={()=>setHide(!hide)}>{hide?<IoMdEyeOff size={20}/>:<IoMdEye size={20}/>}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-gradient-to-l from-purple-600 to-indigo-400 text-white cursor-pointer rounded-full w-full mt-5 flex items-center gap-3 justify-center transition transform active:scale-90 ${
              loading && "opacity-50"
            }`}
          >
            <span>Submit</span>
            {loading && <Loader />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
