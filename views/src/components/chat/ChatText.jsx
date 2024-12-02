import React from "react";
import { IoSend } from "react-icons/io5";

const ChatText = () => {
  return (
    <div className="flex min-h-14  ">
      <input
        placeholder="Type Message"
        type="text"
        className="h-full border w-full outline-none px-4"
      />
      <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2  shadow-md ">
        <span>Send</span>
        <IoSend className="text-lg" />
      </button>
    </div>
  );
};

export default ChatText;
