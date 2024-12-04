import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import UserList from "./UserList";
import ChatBox from "./ChatBox";
import { useMyContext } from "../../store/ContextApi";
import {
  useFetchAllConversations,
  useFetchAllUsers,
} from "../../hooks/useQuery";
import { useLogoutHandler } from "../../hooks/useHook";
import Skeleton from "../Skeleton";

const Chat = () => {
  const { openUserList, setUserData } = useMyContext();
  const navigate = useNavigate();

  const {
    isLoading,
    data: allUsers,
    refetch,
    error,
  } = useFetchAllUsers(onError);

  const {
    isLoading: conversationLoader,
    data: allConversations,
    refetch: conversationRefetch,
    error: converError,
  } = useFetchAllConversations(onError);

  console.log("allConversations", allConversations);

  function onError(err) {
    if (err.status == 401) {
      useLogoutHandler(setUserData, navigate, toast);
    } else {
      toast.error("fetch to failed dat");
    }
  }

  if (isLoading) return <Skeleton />;

  return (
    <div className="flex min-h-[calc(100vh-74px)]  max-h-[calc(100vh-74px)]">
      <div
        className={`min-h-full max-h-full overflow-y-auto  border  space-y-6 transition-all duration-100 ${
          openUserList ? " w-0 p-0" : "w-80 p-6"
        }`}
      >
        <UserList
          allUsers={allUsers}
          openUserList={openUserList}
          refetch={refetch}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <ChatBox />
      </div>
    </div>
  );
};

export default Chat;
