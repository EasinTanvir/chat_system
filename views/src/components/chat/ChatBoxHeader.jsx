import React from "react";
import { FaPhone } from "react-icons/fa";
import ActiveRadio from "./ActiveRadio";

const ChatBoxHeader = ({ selectedUser }) => {
  return (
    <div className="min-h-[70px] max-h-[70px] flex items-center justify-between px-6 border-b-2 ">
      {selectedUser && (
        <>
          <div className="flex gap-2 items-center">
            <h1 className="text-xl font-semibold">
              {selectedUser ? selectedUser : null}
            </h1>
            <ActiveRadio />
          </div>
          <div>
            <button>
              <FaPhone />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBoxHeader;
