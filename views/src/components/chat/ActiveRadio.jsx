import React from "react";
import { Tooltip } from "@mui/material";

// Active user (green)
const ActiveRadio = () => {
  return (
    <Tooltip title="User is online" arrow>
      <div className="h-3 w-3 rounded-full bg-green-600"></div>
    </Tooltip>
  );
};

export default ActiveRadio;

// Offline user (red)
export const OfflineRadio = () => {
  return (
    <Tooltip title="User is offline" arrow>
      <div className="h-3 w-3 rounded-full bg-rose-600"></div>
    </Tooltip>
  );
};
