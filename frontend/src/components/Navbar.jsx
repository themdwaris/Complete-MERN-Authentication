import React, { useState } from "react";
import { CgUserlane } from "react-icons/cg";
import { useYourContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const { navigate, user, setUser, setIsLoggedIn, backendURL } =
    useYourContext();
  const [showMenu, setShowMenu] = useState(false);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${backendURL}/api/auth/logout`);
      if (res?.data?.success) {
        setUser({});
        setIsLoggedIn(false);
        navigate("/");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="w-full py-5 flex items-center justify-between select-none">
      <div className="flex items-center gap-1">
        <span className="text-slate-200">
          <CgUserlane size={25} />
        </span>
        <h1 className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-purple-600 to-indigo-400 inline-block text-transparent bg-clip-text">
          auth
        </h1>
      </div>

      {user?.name ? (
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full p-2 cursor-pointer flex items-center justify-center relative group`}
            onClick={() => setShowMenu(!showMenu)}
            title="Profile"
          >
            <span className="text-xl font-medium">
              {user?.name && user?.name[0]?.toUpperCase()}
            </span>
          </div>

          <span
            className="cursor-pointer p-2 rounded-full bg-red-700 transition transform active:scale-90 hover:bg-red-800"
            onClick={logout}
            title="Logout"
          >
            <IoMdLogOut size={22}/>
          </span>
        </div>
      ) : (
        <button
          className="py-1 sm:py-2 px-4 text-sm rounded-full bg-gradient-to-r from-purple-600 to-indigo-300 text-white cursor-pointer transition transform active:scale-90"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
