import { Navigate, Outlet } from "react-router-dom";

import { useMyContext } from "../store/ContextApi";

const PrivateRoute = () => {
  const { userData } = useMyContext();

  return !userData?.id ? <Navigate to="/signin" /> : <Outlet />;
};

export default PrivateRoute;
