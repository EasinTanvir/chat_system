import React from "react";
import UserList from "./UserList";
import ChatBox from "./ChatBox";
import { useMyContext } from "../../store/ContextApi";

const Chat = () => {
  const { openUserList } = useMyContext();
  return (
    <div className="flex min-h-[calc(100vh-74px)]  max-h-[calc(100vh-74px)]">
      <div
        className={`min-h-full max-h-full overflow-y-auto  border  space-y-6 transition-all duration-100 ${
          openUserList ? " w-0 p-0" : "w-80 p-6"
        }`}
      >
        <UserList />
      </div>
      <div className="flex-1 flex flex-col">
        <ChatBox />
      </div>
    </div>
  );
};

export default Chat;
