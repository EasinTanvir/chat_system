import React from "react";
import { FaPhone } from "react-icons/fa";
import ActiveRadio from "./ActiveRadio";

const ChatBoxHeader = () => {
  return (
    <div className="min-h-[70px]  flex items-center justify-between px-6 border-b-2 ">
      <div className="flex gap-2 items-center">
        <h1 className="text-xl font-semibold">Easin</h1>
        <ActiveRadio />
      </div>
      <div>
        <button>
          <FaPhone />
        </button>
      </div>
    </div>
  );
};

export default ChatBoxHeader;
