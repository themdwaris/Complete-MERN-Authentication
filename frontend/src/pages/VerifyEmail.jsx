import React, { useEffect, useRef } from "react";
import Loader from "../components/Loader";
import { useYourContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const VerifyEmail = () => {
  axios.defaults.withCredentials = true;
  const {
    loading,
    backendURL,
    navigate,
    setLoading,
    user,
    getUserData,
    setLoginState
  } = useYourContext();
  const inputRef = useRef([]);

  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const digits = inputRef.current.map((e) => e.value);
      const otp = digits.join("");

      const res = await axios.post(`${backendURL}/api/auth/verify-email`, {
        otp,
      });
      if (res?.data?.success) {
        toast.success(res.data.message);
        setLoginState("login")
        navigate("/login");
        getUserData();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };
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

  // Pasting copied OTP
  const pasteHandler = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((digit, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = digit;
      }
    });
    
    if(inputRef.current[pasteArray.length-1]){
      inputRef.current[pasteArray.length-1].focus()
    }
  };

  const sendVerificationOTP = async()=>{
    try {
      axios.defaults.withCredentials=true
      const res = await axios.post(`${backendURL}/api/auth/send-verify-otp`)
      if(res?.data?.success){
        navigate("/email-verify")
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error?.message)
    }
  }
  useEffect(()=>{
    sendVerificationOTP()
  },[])

  useEffect(() => {
    if (user && user?.isUserVerified) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="h-screen bg-gradient-to-r from-purple-600 to-indigo-400 flex items-center justify-center px-5">
      <form
        className="w-full max-w-[400px] mx-auto px-5 pb-10 rounded-xl bg-gray-950"
        onSubmit={verifyEmail}
      >
        <h1 className="text-2xl font-medium text-center py-8">
          Email Verify OTP
          <p className="pt-4 text-sm font-normal py-2 bg-gradient-to-l from-purple-400 to-indigo-200 block text-transparent bg-clip-text">
            Enter the 6-digit code sent to your email
          </p>
        </h1>
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
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-gradient-to-l from-purple-600 to-indigo-400 text-white cursor-pointer rounded-full w-full mt-10 flex items-center gap-3 justify-center transition transform active:scale-90 ${
            loading && "opacity-50"
          }`}
        >
          <span>Verify Email</span>
          {loading && <Loader />}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
