import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { useMyContext } from "../store/ContextApi";
import { userImage } from "../constant";

const users = [
  { id: 1, name: "Easin", image: userImage },
  { id: 2, name: "Tanvir", image: userImage },
  { id: 3, name: "Jack", image: userImage },
  { id: 1, name: "Easin", image: userImage },
  { id: 2, name: "Tanvir", image: userImage },
  { id: 3, name: "Jack", image: userImage },
  { id: 1, name: "Easin", image: userImage },
  { id: 2, name: "Tanvir", image: userImage },
  { id: 3, name: "Jack", image: userImage },
  { id: 1, name: "Easin", image: userImage },
  { id: 2, name: "Tanvir", image: userImage },
  { id: 3, name: "Jack", image: userImage },
];
export const Modals = () => {
  const { openModal, setOpenModal } = useMyContext();
  const handleOpen = () => setOpenModal(true);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={openModal}
        onClose={setOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex-center  h-screen">
          <div className="w-[600px] min-h-[440px] max-h-[440px] overflow-y-auto bg-gray-200 px-6 py-14 rounded-lg space-y-5 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="bg-rose-600 text-white px-3 py-1.5 rounded-lg absolute right-2 top-2 w-fit"
            >
              Close
            </button>

            <div className="mt-2 space-y-4">
              {users.map((item) => (
                <SingleUser key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const SingleUser = ({ id, name, image }) => {
  return (
    <div className="border border-slate-400 px-2 py-4 rounded-xl  shadow-md  flex justify-between items-center">
      <div className="flex items-center  gap-3">
        <img className="w-9 h-9 rounded-full" src={image} />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg">
        Add User
      </button>
    </div>
  );
};
