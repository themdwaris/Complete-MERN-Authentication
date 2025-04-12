import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  
  const [loginState, setLoginState] = useState("login");
  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(()=>{
    const logged = JSON.parse(localStorage.getItem("isLogged"))
    if(logged!==null){
      setIsLoggedIn(logged===true)
    }
  },[])

  const isAuthState = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/auth/is-authenticated`);
      if (res?.data?.success) {
        getUserData();
        setIsLoggedIn(true);
        localStorage.setItem("isLogged", true);
      }
    } catch (error) {
      toast.error(error?.message);
      console.log("Failed to authenticate:", error);
    }
  };
  const getUserData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${backendURL}/api/user/user-info`);
      if (res?.data?.success) {
        setUser(res.data.userData);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    isAuthState();
  }, []);


  return (
    <AppContext.Provider
      value={{
        backendURL,
        navigate,
        loading,
        setLoading,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        getUserData,
        isAuthState,
        loginState,
        setLoginState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useYourContext = () => useContext(AppContext);

export { AppContext, AppContextProvider, useYourContext };
