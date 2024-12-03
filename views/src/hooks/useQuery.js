import { useQuery } from "react-query";

import api from "../api/api";

export const useFetchAllUsers = (onError) => {
  return useQuery(
    "all-users",
    async () => {
      return await api.get("/user/all");
    },
    {
      select: (data) => {
        const sendData = data.data.users.map((item) => {
          return {
            id: item.id,
            userName: item.userName,
          };
        });

        return sendData;
      },
      onError,
      staleTime: 5000,
    }
  );
};
