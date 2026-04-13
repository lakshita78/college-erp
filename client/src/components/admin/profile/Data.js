import React from "react";

const Data = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1 w-full max-w-[280px]">
      <span className="text-xs font-bold text-primary-500/60 uppercase tracking-widest pl-1">
        {label}
      </span>
      <div className="bg-white/50 backdrop-blur-sm px-4 py-3 rounded-2xl border border-gray-100 shadow-sm font-medium text-gray-800 text-sm hover:border-primary-200 transition-colors duration-200">
        {value || "Not Provided"}
      </div>
    </div>
  );
};

export default Data;
