import api from "../api/api";

export const useLogoutHandler = async (setUserData, navigate, toast) => {
  try {
    await api.post("/auth/logout");

    setUserData(null);
    localStorage.removeItem("userData");
    navigate("/signin");
  } catch (err) {
    console.error(err);
    toast.error("Logout Failed");
  }
};
