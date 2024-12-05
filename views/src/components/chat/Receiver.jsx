import React from "react";
import moment from "moment";
import { FaClock } from "react-icons/fa";

const Receiver = ({ text, time, profileImage }) => {
  return (
    <div className="flex justify-start items-start mb-4">
      <img
        src={profileImage || "https://via.placeholder.com/40"}
        alt="Receiver"
        className="w-10 h-10 rounded-full mr-3"
      />

      <div className="relative bg-gray-300 text-black rounded-lg p-3 max-w-[70%]">
        <h1 className="text-[15px]">{text}</h1>

        <div className="absolute -left-2 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-gray-300"></div>

        <div className="flex items-center  text-gray-600 mt-2">
          <FaClock className="mr-1" />
          <span className="text-xs"> {moment(time).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default Receiver;
