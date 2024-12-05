import React from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import Sender from "./Sender";
import Receiver from "./Receiver";
import ChatText from "./ChatText";
import { userImage } from "../../constant";
import { useMyContext } from "../../store/ContextApi";

const ChatBox = ({ allMesssages }) => {
  const { userData } = useMyContext();
  return (
    <>
      <ChatBoxHeader />
      <div className="min-h-[calc(100%-160px)] max-h-[calc(100%-160)] overflow-y-auto px-4 py-5 space-y-4">
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
      <ChatText />
    </>
  );
};

export default ChatBox;
