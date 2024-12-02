import React from "react";

const Sender = ({ sender, profileImage }) => {
  return (
    <div className="flex justify-end items-center">
      {/* Message Bubble */}
      <div className="relative bg-blue-500 text-white rounded-lg p-3 max-w-[70%]">
        <h1>{sender}</h1>
        {/* Triangle pointing to profile image */}
        <div className="absolute -right-2 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-blue-500"></div>
      </div>
      {/* Profile Image */}
      <img
        src={profileImage || "https://via.placeholder.com/40"}
        alt="Sender"
        className="w-10 h-10 rounded-full ml-3"
      />
    </div>
  );
};

export default Sender;
