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
    <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6 mb-10">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary-600">
            <div className="p-2 bg-primary-500/10 rounded-xl">
              <AssignmentIndIcon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">My Student Profile</h1>
          </div>
          <button
            onClick={() => navigate("/student/update")}
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

            <div className="space-y-12 pt-6">
              {/* Personal & Academic Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                <div className="space-y-8">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 border-l-4 border-primary-500 ml-1">Personal Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Data label="Full Name" value={user.result.name} />
                    <Data label="Username" value={user.result.username} />
                    <Data label="Email" value={user.result.email} />
                    <Data label="DOB" value={user.result.dob} />
                    <Data label="Contact" value={user.result.contactNumber} />
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 border-l-4 border-indigo-500 ml-1">Academic Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Data label="Department" value={user.result.department} />
                    <Data label="Batch" value={user.result.batch} />
                    <Data label="Year" value={user.result.year} />
                    <Data label="Section" value={user.result.section} />
                  </div>
                </div>
              </div>

              {/* Family Group */}
              <div className="pt-8 border-t border-gray-100/50">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 border-l-4 border-emerald-500 ml-1 mb-8">Family Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Data label="Father's Name" value={user.result.fatherName} />
                  <Data label="Mother's Name" value={user.result.motherName} />
                  <Data label="Father's Contact" value={user.result.fatherContactNumber} />
                </div>
              </div>

              {/* Status Footer */}
              <div className="p-6 bg-primary-500/5 rounded-[2rem] border border-primary-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">Enrollment Active</span>
                </div>
                <span className="text-[10px] font-bold text-primary-500/40 uppercase tracking-tighter italic">Student Portal • Infix ERP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;



