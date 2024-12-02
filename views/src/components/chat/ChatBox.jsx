import React from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import Sender from "./Sender";
import Receiver from "./Receiver";
import ChatText from "./ChatText";
import { userImage } from "../../constant";

const messages = [
  {
    sender: "Hello, ",
    receiver: "Reply how are you ",
    senderImage: userImage, // Add actual profile images here
    receiverImage: userImage,
  },
  {
    sender: "Great",
    receiver: "I am also fine",
    senderImage: userImage,
    receiverImage: userImage,
  },
  {
    sender: "What about you",
    receiver: "Good man",
    senderImage: userImage,
    receiverImage: userImage,
  },
  {
    sender: "Well done",
    receiver: "We are working on our system",
    senderImage: userImage,
    receiverImage: userImage,
  },
  {
    sender: "Hello",
    receiver: "Reply how are you",
    senderImage: userImage, // Add actual profile images here
    receiverImage: userImage,
  },
  {
    sender: "Great",
    receiver: "I am also fine",
    senderImage: userImage,
    receiverImage: userImage,
  },
  {
    sender: "What about you",
    receiver: "Good man",
    senderImage: userImage,
    receiverImage: userImage,
  },
  {
    sender: "Well done",
    receiver: "We are working on our system",
    senderImage: userImage,
    receiverImage: userImage,
  },
  {
    sender: "Hello",
    receiver: "Reply how are you",
    senderImage: userImage, // Add actual profile images here
    receiverImage: userImage,
  },
  {
    sender: "Great",
    receiver: "I am also fine",
    senderImage: userImage,
    receiverImage: userImage,
  },
  {
    sender: "What about you",
    receiver: "Good man",
    senderImage: userImage,
    receiverImage: userImage,
  },
  {
    sender: "Well done",
    receiver: "We are working on our system",
    senderImage: userImage,
    receiverImage: userImage,
  },
];

const ChatBox = () => {
  return (
    <>
      <ChatBoxHeader />
      <div className="min-h-[calc(100%-160px)] max-h-[calc(100%-160)] overflow-y-auto px-4 py-y space-y-4">
        {messages.map((item, i) => (
          <div className="space-y-4" key={i}>
            <Sender sender={item.sender} profileImage={item.senderImage} />
            <Receiver
              receiver={item.receiver}
              profileImage={item.receiverImage}
            />
          </div>
        ))}
      </div>
      <ChatText />
    </>
  );
};

export default ChatBox;
