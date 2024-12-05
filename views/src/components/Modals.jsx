import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

import { useMyContext } from "../store/ContextApi";
import { userImage } from "../constant";
import api from "../api/api";
import OvalLoader from "./OvalLoader";

export const Modals = ({ allUsers, refetch, conversationRefetch }) => {
  const { openModal, setOpenModal } = useMyContext();

  return (
    <div>
      <Modal
        open={openModal}
        onClose={setOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex-center  h-screen">
          <div className="w-[600px] min-h-[440px] max-h-[440px] overflow-y-auto bg-gray-200 px-6  rounded-lg space-y-5 relative">
            <div className="text-end mt-4">
              <button onClick={() => setOpenModal(false)}>
                <RxCross1 size={20} />
              </button>
            </div>

            <div className="mt-2 space-y-4">
              {allUsers?.map((item) => (
                <SingleUser
                  key={item.id}
                  {...item}
                  refetch={refetch}
                  conversationRefetch={conversationRefetch}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const SingleUser = ({ id, userName, image, refetch, conversationRefetch }) => {
  const [loader, setLoader] = useState(false);

  const onAddConversationHandler = async (receiverId) => {
    try {
      setLoader(true);
      const { data } = await api.post("/conversation/create", {
        receiverId,
      });
      await refetch();
      await conversationRefetch();
      toast.success("Conversation Created successful");

      console.log(data);
    } catch (err) {
      toast.error("Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="border border-slate-300 px-2 py-4 rounded-xl   flex justify-between items-center">
      <div className="flex items-center  gap-3">
        <img className="w-9 h-9 rounded-full" src={userImage} />
        <div>
          <h3 className="text-lg font-bold">{userName}</h3>
        </div>
      </div>

      <button
        disabled={loader}
        onClick={() => onAddConversationHandler(id)}
        className="bg-blue-600 text-white px-3 py-1.5 rounded-lg min-w-20 flex-center"
      >
        {loader ? <OvalLoader /> : "Add User"}
      </button>
    </div>
  );
};
