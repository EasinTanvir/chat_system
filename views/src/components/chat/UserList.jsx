import React from "react";
import { FaComments, FaUserPlus } from "react-icons/fa";

import { userImage } from "../../constant";
import { Modals } from "../Modals";
import { useMyContext } from "../../store/ContextApi";

const UserList = ({ openUserList, allUsers }) => {
  const { openModal, setOpenModal } = useMyContext();
  return (
    <>
      {!openUserList && (
        <div className=" flex gap-1">
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            <FaUserPlus className="text-sm" /> {/* Add User Icon */}
            Add User
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all">
            <FaComments className="text-sm" /> {/* Create Room Icon */}
            Create Room
          </button>
        </div>
      )}
      {allUsers?.map((item) => (
        <SingleUser key={item.id} {...item} />
      ))}
      <Modals />
    </>
  );
};

export default UserList;

const SingleUser = ({ id, userName, image }) => {
  return (
    <div className="border p-2 rounded-xl  flex items-center  gap-3">
      <img className="w-9 h-9 rounded-full" alt={userName} src={userImage} />
      <div>
        <h3 className="text-lg font-bold">{userName}</h3>
        <p>Hello, world how are you</p>
      </div>
    </div>
  );
};
