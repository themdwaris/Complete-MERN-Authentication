import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="absolute inset-0 min-h-screen w-full bg-gray-950 bg-[radial-gradient(#313131_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-full px-5 sm:px-8 md:px-14 lg:px-32">
        <Navbar />
        <Header />
      </div>
    </div>
  );
};

export default Home;
