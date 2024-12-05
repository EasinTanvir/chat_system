import React from "react";

const Receiver = ({ text, time, profileImage }) => {
  return (
    <div className="flex justify-start items-center">
      {/* Profile Image */}
      <img
        src={profileImage || "https://via.placeholder.com/40"}
        alt="Receiver"
        className="w-10 h-10 rounded-full mr-3"
      />
      {/* Message Bubble */}
      <div className="relative bg-gray-300 text-black rounded-lg p-3 max-w-[70%]">
        <h1>{text}</h1>
        {/* Triangle pointing to profile image */}
        <div className="absolute -left-2 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-gray-300"></div>
      </div>
    </div>
  );
};

export default Receiver;
