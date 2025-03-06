import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/V.png";
import { UserContext } from "../Context/UserContext";
import { CgProfile } from "react-icons/cg";
import SearchComponent from "./searchComponent";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const NavbarComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const [selected, setSelected] = useState();
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
            <h2 class="text-transparent bg-clip-text bg-gradient-to-t uppercase text-shadow-white from-black to-white text-3xl font-extrabold">
              blogverse
            </h2>
          </Link>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="w-full max-w-md">
            <TabGroup>
              <TabList className="flex items-center justify-center gap-4">
                <Tab
                  className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/35 data-[hover]:bg-white/15 data-[selected]:data-[hover]:bg-white/25 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={() => navigate("/admin/home")}
                >
                  Home
                </Tab>
                <Tab
                  className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/35 data-[hover]:bg-white/15 data-[selected]:data-[hover]:bg-white/25 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={() => navigate("/admin/users/details")}
                >
                  UserInfo
                </Tab>
                <Tab
                  className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/35 data-[hover]:bg-white/15 data-[selected]:data-[hover]:bg-white/25 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={() => navigate("/admin/analytics/id")}
                >
                  Analytics
                </Tab>
              </TabList>
            </TabGroup>
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
