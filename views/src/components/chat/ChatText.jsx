import React from "react";
import { IoSend } from "react-icons/io5";
import api from "../../api/api";
import { useMyContext } from "../../store/ContextApi";
import { useState } from "react";

const ChatText = ({ allMesssages, setAllMesssages }) => {
  const { converId, receiverId, userData, socket } = useMyContext();

  const [text, setText] = useState("");

  const onMessageHandler = async () => {
    socket.emit("send-message-backend", {
      text,
      converId,
      receiverId,
      senderId: userData.id,
    });
    setAllMesssages([
      ...allMesssages,
      {
        text,
        receiverId: receiverId,
        conversationId: converId,
        senderId: userData.id,
      },
    ]);

    try {
      await api.post("/message/create", {
        receiverId: receiverId,
        conversationId: converId,
        text,
      });
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-14  max-h-14 ">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Message"
        type="text"
        className="h-full border w-full outline-none px-4"
      />
      <button
        onClick={onMessageHandler}
        className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2  shadow-md "
      >
        <span>Send</span>
        <IoSend className="text-lg" />
      </button>
    </div>
  );
};

export default ChatText;
