import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/V.png";
import { UserContext } from "../Context/UserContext";
import { CgProfile } from "react-icons/cg";
import SearchComponent from "./searchComponent";

const NavbarComponent = () => {
  const { user, setUser } = useContext(UserContext);
  //const userId = user._id ? user._id : JSON.parse(user)._id;
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

        {user ? (
          <div className="flex flex-row gap-4 items-center">
            <SearchComponent />
            <Link to={`/profile/${user._id || JSON.parse(user)._id}`}>
              <CgProfile className="text-4xl " />
            </Link>
            <Link to="/add/blog">
              <div className="rounded-lg border-[1px] border-amber-50 p-3 hover:bg-[rgba(240,240,240,0.6)] active:bg-black">
                Add blog
              </div>
            </Link>
            <button
              onClick={() => handleLogout()}
              className="rounded-lg border-[1px] border-amber-50 p-3 hover:bg-[rgba(240,240,240,0.6)] active:bg-black"
            >
              Log-out
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <Link to="/login">
              <div className="rounded-lg border-[1px] border-amber-50 p-3 hover:bg-[rgba(240,240,240,0.6)] active:bg-black">
                Log-in
              </div>
            </Link>
            <Link to="/signin">
              <div className="rounded-lg border-[1px] border-amber-50 p-3 hover:bg-[rgba(240,240,240,0.6)] active:bg-black">
                Sign-in
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarComponent;
