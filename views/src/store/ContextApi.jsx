import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

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
  const [selectActiveUsers, setSelectActiveUser] = useState([]);
  const [socket, setSocket] = useState(null);

  // Create the socket connection once user data is available
  useEffect(() => {
    if (userData?.id) {
      const socketInstance = io.connect("http://localhost:3000", {
        auth: { token: userData.id },
      });
      setSocket(socketInstance);

      // Clean up socket on component unmount or when userData changes
      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);

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
        selectActiveUsers,
        setSelectActiveUser,
        socket, // Add socket to the context value
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
