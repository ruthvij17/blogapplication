import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/V.png";
import { UserContext } from "../Context/UserContext";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser("");
    navigate("/");
    localStorage.removeItem("user");
  };
  return (
    <>
      <div className="w-[98%] h-20 p-3 mx-2 my-1 rounded-lg bg-black flex flex-row justify-between items-center text-white">
        <div className="logo flex flex-row gap-3.5 items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-20 h-20" />
          </Link>
          <Link to="/">
            <h2
              className="uppercase text-white text-3xl font-extrabold"
              style={{ "font-family": "Orbitron" }}
            >
              blogverse
            </h2>
          </Link>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center gap-4 text-sm">
              <NavLink
                to="/admin/home"
                className={({ isActive }) => {
                  const styles = "hover:bg-white/55 px-3 py-2 rounded-full";
                  return isActive ? styles + " bg-white/30" : styles + "";
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/admin/users/details"
                className={({ isActive }) => {
                  const styles = "hover:bg-white/55 px-3 py-2 rounded-full";
                  return isActive ? styles + " bg-white/30" : styles + "";
                }}
              >
                User Info
              </NavLink>
              {/* <NavLink
                to="/admin/analytics/id"
                className={({ isActive }) => {
                  const styles =
                    "hover:bg-white/55 px-3 py-2 rounded-full pointer-events-none";
                  return isActive ? styles + " bg-white/30" : styles + "";
                }}
              >
                Analytics
              </NavLink> */}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <button
            onClick={() => handleLogout()}
            className="rounded-lg border-[1px] border-amber-50 p-3 hover:bg-[rgba(240,240,240,0.6)] active:bg-black"
          >
            Log-out
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
