import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ChatBox from "./ChatBox";
import { useMyContext } from "../../store/ContextApi";
import { useLogoutHandler } from "../../hooks/useHook";
import Skeleton from "../Skeleton";
import ConversationList from "./ConversationList";
import api from "../../api/api";
import {
  useFetchAllConversations,
  useFetchAllUsers,
} from "../../hooks/useQuery";

import { socket } from "../../../utils/socket";

const Chat = () => {
  const { openUserList, setUserData, converId, receiverId } = useMyContext();
  const [allMesssages, setAllMesssages] = useState([]);
  const [msgLoader, setMsgLoader] = useState(false);
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

  useEffect(() => {
    const handler = (data) => {
      setAllMesssages((prevMessages) => [
        ...prevMessages,
        {
          text: data.message,
          receiverId: data.receiverId,
          conversationId: data.converId,
          senderId: data.senderId,
        },
      ]);
    };

    socket.on("send-message-frontend", handler);

    return () => socket.off("send-message-frontend", handler);
  }, []);

  useEffect(() => {
    const fetchConverMessages = async () => {
      setMsgLoader(true);
      try {
        const { data } = await api.get(`/message/${converId}`);

        setAllMesssages(data.messages);
      } catch (err) {
        console.error(err);
      } finally {
        setMsgLoader(false);
      }
    };

    if (converId) {
      fetchConverMessages();
    }
  }, [converId]);

  function onError(err) {
    if (err.status == 401) {
      useLogoutHandler(setUserData, navigate, toast);
    } else {
      toast.error("fetch to failed dat");
    }
  }

  const loader = isLoading || conversationLoader;

  if (loader)
    return (
      <div className="m-7">
        <Skeleton />
      </div>
    );

  return (
    <div className="flex min-h-[calc(100vh-74px)]  max-h-[calc(100vh-74px)]">
      <div
        className={`min-h-full max-h-full overflow-y-auto  border  space-y-6 transition-all duration-100 ${
          openUserList ? " w-0 p-0" : "w-80 p-6"
        }`}
      >
        <ConversationList
          allUsers={allUsers}
          allConversation={allConversations?.conversations}
          openUserList={openUserList}
          refetch={refetch}
          conversationRefetch={conversationRefetch}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <ChatBox
          allMesssages={allMesssages}
          setAllMesssages={setAllMesssages}
          msgLoader={msgLoader}
        />
      </div>
    </div>
  );
};

export default Chat;
