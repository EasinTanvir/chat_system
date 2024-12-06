import React from "react";
import { IoSend } from "react-icons/io5";
import api from "../../api/api";
import { useMyContext } from "../../store/ContextApi";
import { useState } from "react";
import toast from "react-hot-toast";

const ChatText = ({ allMesssages, setAllMesssages }) => {
  const { converId, receiverId, userData, socket } = useMyContext();

  const [text, setText] = useState("");

  const onMessageHandler = async (event) => {
    if (!socket) return toast.error("socket loaded failed");

    event.preventDefault();
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
    <form onSubmit={onMessageHandler} className="flex min-h-14  max-h-14 ">
      <input
        disabled={!converId}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Message"
        type="text"
        className="h-full border w-full outline-none px-4"
      />
      <button
        disabled={!converId}
        type="submit"
        className={`flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2  shadow-md  ${
          !converId ? "opacity-40" : ""
        }`}
      >
        <span>Send</span>
        <IoSend className="text-lg" />
      </button>
    </form>
  );
};

export default ChatText;
