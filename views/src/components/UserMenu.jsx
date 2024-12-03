import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BiUser } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";

import BackDrop from "./BackDrop";
import toast from "react-hot-toast";
import { useLogoutHandler } from "../hooks/useHook";

const UserMenu = ({ user, setUserData }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = async () => {
    useLogoutHandler(setUserData, navigate, toast);
  };

  return (
    <div className="relative z-30 ">
      <div
        onClick={handleClick}
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
      >
        <Avatar alt="Easin" src="" />
      </div>
      <Menu
        sx={{ width: "400px", borderRadius: "40px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: 160 },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "10px",
            },
          },
        }}
      >
        <Link to="/chat">
          <MenuItem className="flex gap-2 " onClick={handleClose}>
            <BiUser className="text-xl" />
            <span className="font-bold text-[16px] mt-1">{user?.userName}</span>
          </MenuItem>
        </Link>

        {/* Beautiful Logout Button */}
        <MenuItem className="flex mt-2" onClick={logOutHandler}>
          <div className="w-full flex items-center justify-center gap-2 px-2 py-2 bg-rose-700 rounded-full text-white font-semibold transition-all duration-300 hover:bg-red-700 ">
            <IoExitOutline className="text-2xl" />
            <span className="text-sm">Log Out</span>
          </div>
        </MenuItem>
      </Menu>
      {open && <BackDrop />}
    </div>
  );
};

export default UserMenu;
