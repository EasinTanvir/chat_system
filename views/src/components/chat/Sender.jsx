import React from "react";
import moment from "moment";
import { FaClock } from "react-icons/fa";

const Sender = ({ text, time, profileImage }) => {
  return (
    <div className="flex justify-end items-start mb-4">
      <div className="relative bg-blue-500 text-white rounded-lg p-3 max-w-[70%]">
        <h1 className="text-[15px]">{text}</h1>

        <div className="absolute -right-2 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-blue-500"></div>

        <div className="flex items-center  text-gray-200 mt-2">
          <FaClock className="mr-1" />
          <span className="text-xs"> {moment(time).fromNow()}</span>
        </div>
      </div>

      <img
        src={profileImage || "https://via.placeholder.com/40"}
        alt="Sender"
        className="w-10 h-10 rounded-full ml-3"
      />
    </div>
  );
};

export default Sender;
