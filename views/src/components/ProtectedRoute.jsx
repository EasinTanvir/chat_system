import React from "react";
import { Navigate } from "react-router-dom";

import { useMyContext } from "../store/ContextApi";

const ProtectedRoute = ({ children }) => {
  const { token } = useMyContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
