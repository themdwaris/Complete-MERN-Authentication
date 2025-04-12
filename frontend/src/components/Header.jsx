import React from "react";
import { MdWavingHand } from "react-icons/md";
import { useYourContext } from "../context/AppContext";
import avatar from "../assets/userProfile.jpeg";
import { toast } from "react-toastify";

const Header = () => {
  const { user, navigate } = useYourContext();

  return (
    <div className="h-[70vh] w-full flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 justify-center items-center">
        <img
          src={`${user?.name ? avatar : "./bannerlogo.png"}`}
          alt="banner-logo"
          className="w-28 sm:w-36 rounded-xl"
        />
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="flex items-center gap-3 text-2xl">
            Hey {user?.name ? user?.name : "Developer"}
            <span className="text-indigo-200">
              <MdWavingHand size={25} />
            </span>
          </h1>
          <h1 className="text-3xl md:text-5xl font-medium text-center">
            Welcome to our app
          </h1>
          <p className="text-sm text-center font-normal">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
            dicta, error non perspiciatis adipisicing elit.
          </p>
          <button
            className="py-2 mt-5 sm:py-2 px-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white cursor-pointer transition transform active:scale-90"
            onClick={() => {
              user?.name?navigate("/todo-app"):toast.warning("Please login first")
            }}
          >
            Create Todos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
