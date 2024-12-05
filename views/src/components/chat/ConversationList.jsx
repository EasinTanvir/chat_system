import React from "react";
import { FaComments, FaUserPlus } from "react-icons/fa";

import { userImage } from "../../constant";
import { Modals } from "../Modals";
import { useMyContext } from "../../store/ContextApi";
import { socket } from "../../../utils/socket";
import { truncateText } from "../../../utils/truncate";

const ConversationList = ({
  openUserList,
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
            Add User
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all">
            <FaComments className="text-sm" />
          </button>
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
        <>no conversation created yet</>
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
  const user =
    userData?.id === senderId ? receiver?.userName : sender?.userName;
  return (
    <div
      onClick={() => {
        setConverId(id);
        socket.emit("room", { converId: id });
        setReceiverId(receiverId);
        setSelectedUser(user);
      }}
      className={`border p-2 cursor-pointer rounded-xl  flex items-center  gap-3 ${
        converId === id ? "bg-slate-300" : ""
      }`}
    >
      <img className="w-9 h-9 rounded-full" alt={userName} src={userImage} />
      <div>
        <h3 className="text-lg font-bold">{user}</h3>
        {Message.length > 0 ? <p>{truncateText(Message[0]?.text, 2)}</p> : null}
      </div>
    </div>
  );
};
