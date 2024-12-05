import { io } from "socket.io-client";
import { useMyContext } from "../store/ContextApi";

const useSocket = () => {
  const { userData } = useMyContext();

  const socket = io.connect("http://localhost:3000", {
    auth: { token: userData?.id },
  });

  return { socket };
};

export default useSocket;
