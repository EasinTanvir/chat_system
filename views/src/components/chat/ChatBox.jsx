import React, { useEffect, useRef } from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import Sender from "./Sender";
import Receiver from "./Receiver";
import ChatText from "./ChatText";
import { userImage } from "../../constant";
import { useMyContext } from "../../store/ContextApi";
import Skeleton from "../Skeleton";

const ChatBox = ({ allMesssages, setAllMesssages, msgLoader }) => {
  const { userData, selectedUser } = useMyContext();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [allMesssages]);

  return (
    <>
      <ChatBoxHeader selectedUser={selectedUser} />
      <div
        ref={chatContainerRef}
        className="min-h-[calc(100%-126px)] max-h-[calc(100%-126px)] custom-scrollbar overflow-y-auto px-4 py-5 space-y-4 
                   scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        {msgLoader ? (
          <Skeleton />
        ) : (
          <>
            {allMesssages?.map((item, i) => (
              <div className="space-y-4" key={i}>
                {item?.senderId === userData?.id ? (
                  <Sender profileImage={userImage} {...item} />
                ) : (
                  <Receiver {...item} profileImage={userImage} />
                )}
              </div>
            ))}
          </>
        )}
      </div>
      {!msgLoader && (
        <ChatText
          allMesssages={allMesssages}
          setAllMesssages={setAllMesssages}
        />
      )}
    </>
  );
};

export default ChatBox;
