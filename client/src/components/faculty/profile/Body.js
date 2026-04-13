import React from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Avatar } from "@mui/material";
import Data from "./Data";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary-600">
            <div className="p-2 bg-primary-500/10 rounded-xl">
              <AssignmentIndIcon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          </div>
          <button
            onClick={() => navigate("/faculty/update")}
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-primary-600 border border-primary-100 rounded-2xl shadow-sm hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 font-semibold text-sm group"
          >
            <EditRoundedIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Update Profile
          </button>
        </div>

        {/* Profile Card */}
        <div className="relative pt-12">
          <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-infix border border-white/50 p-8 lg:p-12">
            {/* Avatar Section */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="p-1.5 bg-gradient-to-tr from-primary-500 to-indigo-500 rounded-full shadow-lg">
                <Avatar 
                  src={user.result.avatar} 
                  sx={{ width: 100, height: 100, border: '4px solid white' }} 
                  className="shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 pt-4">
              {/* Left Column */}
              <div className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Data label="Full Name" value={user.result.name} />
                  <Data label="Username" value={user.result.username} />
                </div>
                <div className="grid grid-cols-1 gap-8">
                  <Data label="Email Address" value={user.result.email} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Data label="Department" value={user.result.department} />
                  <Data label="Designation" value={user.result.designation} />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Data label="Date of Birth" value={user.result.dob} />
                  <Data label="Registration Year" value={user.result.joiningYear} />
                </div>
                <div className="grid grid-cols-1 gap-8">
                  <Data label="Contact Number" value={user.result.contactNumber} />
                </div>
                
                <div className="mt-8 p-6 bg-primary-500/5 rounded-[2rem] border border-primary-500/10">
                  <h3 className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-2">Faculty Identification</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Verified Faculty Member</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;



