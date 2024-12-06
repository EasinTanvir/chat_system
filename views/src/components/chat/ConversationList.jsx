import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

import { userImage } from "../../constant";
import { Modals } from "../Modals";
import { useMyContext } from "../../store/ContextApi";
import { truncateText } from "../../../utils/truncate";
import ActiveRadio, { OfflineRadio } from "./ActiveRadio";

const ConversationList = ({
  allUsers,
  allConversation,
  refetch,
  conversationRefetch,
}) => {
  const {
    userData,
    openModal,
    setOpenModal,
    converId,
    setConverId,
    setReceiverId,
    selectedUser,
    setSelectedUser,
    openUserList,
    setOpenUserList,
  } = useMyContext();

  return (
    <>
      {!openUserList && (
        <div className=" flex gap-1">
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            <FaUserPlus className="text-sm" />
            Create
          </button>
          <div className="flex justify-end items-center  w-full">
            <button onClick={() => setOpenUserList(!openUserList)}>
              {!openUserList ? (
                <FaArrowLeftLong className="text-slate-800" size={20} />
              ) : (
                <FaArrowRightLong className="text-slate-800" size={20} />
              )}
            </button>
          </div>
        </div>
      )}
      {allConversation?.length > 0 ? (
        allConversation?.map((item) => (
          <SingleUser
            key={item.id}
            {...item}
            userData={userData}
            setConverId={setConverId}
            converId={converId}
            setReceiverId={setReceiverId}
            setSelectedUser={setSelectedUser}
          />
        ))
      ) : (
        <div className="pt-10">
          <p className="bg-gray-500 text-white p-2 rounded-lg text-center w-fit px-3">
            Please Create a Conversation
          </p>
        </div>
      )}
      <Modals
        allUsers={allUsers}
        refetch={refetch}
        conversationRefetch={conversationRefetch}
      />
    </>
  );
};

export default ConversationList;

const SingleUser = ({
  senderId,
  receiverId,
  sender,
  receiver,
  userData,
  userName,
  image,
  id,
  setConverId,
  converId,
  setReceiverId,
  setSelectedUser,
  Message,
}) => {
  const { socket, selectActiveUsers, setCurrentInbox } = useMyContext();

  const user =
    userData?.id === senderId ? receiver?.userName : sender?.userName;
  const activeUser = userData?.id === senderId ? receiverId : senderId;

  const isActive = selectActiveUsers.includes(activeUser);

  return (
    <div
      onClick={() => {
        setConverId(id);
        socket.emit("room", { converId: id });
        setReceiverId(receiverId);
        setSelectedUser(user);
        setCurrentInbox({ senderId, receiverId });
      }}
      className={`border p-2 cursor-pointer rounded-xl  flex items-center  gap-3 ${
        converId === id ? "bg-slate-300" : ""
      }`}
    >
      <img className="w-9 h-9 rounded-full" alt={userName} src={userImage} />
      <div>
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-bold">{user}</h3>
          {isActive ? <ActiveRadio /> : <OfflineRadio />}
        </div>

        {Message.length > 0 ? (
          <p className="text-xs">{truncateText(Message[0]?.text, 4)}</p>
        ) : null}
      </div>
    </div>
  );
};
