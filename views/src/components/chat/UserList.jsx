import React from "react";
import { userImage } from "../../constant";
import { FaComments, FaUserPlus } from "react-icons/fa";

const users = [
  { id: 1, name: "Easin", image: userImage },
  { id: 2, name: "Tanvir", image: userImage },
  { id: 3, name: "Jack", image: userImage },
];

const UserList = ({ openUserList }) => {
  return (
    <>
      {!openUserList && (
        <div className=" flex gap-1">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
            <FaUserPlus className="text-sm" /> {/* Add User Icon */}
            Add User
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all">
            <FaComments className="text-sm" /> {/* Create Room Icon */}
            Create Room
          </button>
        </div>
      )}
      {users.map((item) => (
        <User key={item.id} {...item} />
      ))}
    </>
  );
};

export default UserList;

const User = ({ id, name, image }) => {
  return (
    <div className="border p-2 rounded-xl  flex items-center  gap-3">
      <img className="w-9 h-9 rounded-full" src={image} />
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p>Hello, world how are you</p>
      </div>
    </div>
  );
};
