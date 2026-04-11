import React from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Profile = () => {
  return (
    <div className="bg-light-800 h-screen flex items-center justify-center font-primary">
      <div className="flex flex-col bg-white h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 ">
        <Header title="My Profile" />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Profile;
