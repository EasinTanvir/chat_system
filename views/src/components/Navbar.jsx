import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import { useMyContext } from "../store/ContextApi";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [headerToggle, setHeaderToggle] = useState(false);
  const { openUserList, setOpenUserList, userData, setUserData } =
    useMyContext();
  const pathName = useLocation().pathname;

  return (
    <header className="h-[74px] z-50  text-textColor bg-custom-gradient-2 flex items-center sticky top-0">
      <nav className="sm:px-10 px-4 flex w-full h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <h3 className="text-xl font-bold">Chat App</h3>
          </Link>
        </div>
        <ul
          className={`lg:static  absolute left-0  top-[74px] w-full lg:w-fit lg:px-0 sm:px-10 px-4  lg:bg-transparent bg-black   ${
            headerToggle
              ? "min-h-fit max-h-navbarHeight lg:py-0 py-4 shadow-sm shadow-slate-700 lg:shadow-none"
              : "h-0 overflow-hidden "
          }  lg:h-auto transition-all duration-100 font-montserrat text-textColor flex lg:flex-row flex-col lg:gap-8 gap-2`}
        >
          <>
            <Link to="/">
              <li
                className={` ${
                  pathName === "/" ? "font-semibold " : ""
                } py-2 cursor-pointer  hover:text-slate-300 `}
              >
                Home
              </li>
            </Link>
            <Link to="/chat">
              <li
                className={` py-2 cursor-pointer  hover:text-slate-300 ${
                  pathName === "/create-note" ? "font-semibold " : ""
                } `}
              >
                Chat
              </li>
            </Link>
          </>

          {!userData && (
            <Link to="/signup">
              <li className="w-24 text-center bg-rose-500 font-semibold px-4 py-2 rounded-xl cursor-pointer hover:text-slate-300">
                SignUp
              </li>
            </Link>
          )}
          {userData && <UserMenu user={userData} setUserData={setUserData} />}
        </ul>
        <span
          onClick={() => setHeaderToggle(!headerToggle)}
          className="lg:hidden block cursor-pointer text-textColor  shadow-md hover:text-slate-400"
        >
          {headerToggle ? (
            <RxCross2 className=" text-2xl" />
          ) : (
            <IoMenu className=" text-2xl" />
          )}
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
