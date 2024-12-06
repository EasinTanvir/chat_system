import React from "react";
import { FaPhone } from "react-icons/fa";
import ActiveRadio, { OfflineRadio } from "./ActiveRadio";
import { FaArrowRightLong } from "react-icons/fa6";
import { useMyContext } from "../../store/ContextApi";

const ChatBoxHeader = ({ selectActiveUsers, userData, receiverId }) => {
  const {
    selectedUser,

    openUserList,
    setOpenUserList,
  } = useMyContext();
  const isActive = selectActiveUsers.includes(receiverId);

  return (
    <div className="min-h-[70px] max-h-[70px] flex items-center justify-between px-6 border-b-2 ">
      <>
        <div className="flex  items-center">
          <>
            <button onClick={() => setOpenUserList(!openUserList)}>
              {!openUserList ? (
                <></>
              ) : (
                <FaArrowRightLong className="text-slate-800  mr-4" size={20} />
              )}
            </button>
          </>

          {selectedUser && (
            <div className="flex items-center gap-2">
              {" "}
              <h1 className="text-xl font-semibold">
                {selectedUser ? selectedUser : null}
              </h1>
              {isActive ? <ActiveRadio /> : <OfflineRadio />}
            </div>
          )}
        </div>
        <div>
          <button>
            <FaPhone />
          </button>
        </div>
      </>
    </div>
  );
};

export default ChatBoxHeader;
