import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/V.png";

const NavbarComponent = () => {
  return (
    <>
      <div className="w-[98%] h-20 p-3 m-2 rounded-xl bg-black flex flex-row justify-between items-center text-white">
        <div className="logo flex flex-row gap-3.5 items-center">
          <img src={logo} alt="logo" className="w-20 h-20" />
          <h2 class="text-transparent bg-clip-text bg-gradient-to-t uppercase text-shadow-white from-black to-white text-3xl font-extrabold">
            blogverse
          </h2>

          <div className="search text-2xl text-gray-500">
            <FaSearch />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Link to="/login">
            <div className="rounded-lg border-[1px] border-amber-50 p-3">
              Log-in
            </div>
          </Link>
          <Link to="/signin">
            <div className="rounded-lg border-[1px] border-amber-50 p-3">
              Sign-in
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
