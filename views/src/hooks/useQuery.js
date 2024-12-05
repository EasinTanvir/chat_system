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
      staleTime: Infinity, // Data remains fresh indefinitely
      cacheTime: Infinity, // Keeps data in the cache without automatic garbage collection
      refetchOnWindowFocus: false, // Prevents refetching on window focus
      refetchOnMount: false, // Prevents refetching when the component remounts
      refetchInterval: false, //
    }
  );
};

export const useFetchAllConversations = (onError) => {
  return useQuery(
    "all-conversations",
    async () => {
      return await api.get("/conversation/all");
    },
    {
      select: (data) => {
        return {
          conversations: data.data.conversations,
        };
      },
      onError,
      staleTime: Infinity, // Data remains fresh indefinitely
      cacheTime: Infinity, // Keeps data in the cache without automatic garbage collection
      refetchOnWindowFocus: false, // Prevents refetching on window focus
      refetchOnMount: false, // Prevents refetching when the component remounts
      refetchInterval: false, //
    }
  );
};
export const useFetchAllConversationMessage = (converId, onError) => {
  return useQuery(
    ["conversation-message", converId],
    async () => {
      return await api.get(`/message/${converId}`);
    },
    {
      select: (data) => {
        return {
          messages: data.data.messages,
        };
      },
      onError,
      staleTime: 5000,
      enabled: !!converId,
    }
  );
};
