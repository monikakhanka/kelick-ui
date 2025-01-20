import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
