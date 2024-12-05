import React, { useEffect, useRef } from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import Sender from "./Sender";
import Receiver from "./Receiver";
import ChatText from "./ChatText";
import { userImage } from "../../constant";
import { useMyContext } from "../../store/ContextApi";

const ChatBox = ({ allMesssages, setAllMesssages }) => {
  const { userData } = useMyContext();
  const chatContainerRef = useRef(null);

  // Auto-scroll to the bottom with smooth animation
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // Enables smooth scrolling
      });
    }
  }, [allMesssages]);

  return (
    <>
      <ChatBoxHeader />
      <div
        ref={chatContainerRef}
        className="min-h-[calc(100%-160px)] max-h-[calc(100%-160px)] overflow-y-auto px-4 py-5 space-y-4 
                   scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        {allMesssages?.map((item, i) => (
          <div className="space-y-4" key={i}>
            {item?.senderId === userData?.id ? (
              <Sender profileImage={userImage} {...item} />
            ) : (
              <Receiver {...item} profileImage={userImage} />
            )}
          </div>
        ))}
      </div>
      <ChatText allMesssages={allMesssages} setAllMesssages={setAllMesssages} />
    </>
  );
};

export default ChatBox;
