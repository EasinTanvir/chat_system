import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const initial_info = localStorage.getItem
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const [openUserList, setOpenUserList] = useState(false);
  const [userData, setUserData] = useState(initial_info);
  const [openModal, setOpenModal] = useState(false);
  const [converId, setConverId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectActiveStatus, setSelectActiveStatus] = useState(false);

  return (
    <ContextApi.Provider
      value={{
        openUserList,
        setOpenUserList,
        userData,
        setUserData,
        openModal,
        setOpenModal,
        converId,
        setConverId,
        receiverId,
        setReceiverId,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
