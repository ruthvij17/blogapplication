import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const LoginPage = () => {
  const AEMAIL = import.meta.env.VITE_AEMAIL;
  console.log(AEMAIL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      if (response.status == 200) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate(`${email == AEMAIL ? "/admin/home" : "/"}`);
      } else alert(response.data.message);
    } catch (error) {
      alert("Error occurred during login");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        <div className="border-2 border-[rgb(66,63,228)] p-20 rounded-xl bg-black">
          <h1 className="font-semibold text-[rgb(66,63,228)] mb-3 text-center text-2xl">
            Login
          </h1>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col items-center justify-center"
          >
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="border-2 border-[rgb(66,63,228)] rounded-full px-5 py-3 text-xl outline-none bg-transparent placeholder:text-gray-400"
              type="email"
              placeholder="Enter your email"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="Enter password"
              className="border-2 border-[rgb(66,63,228)] rounded-full mt-5 px-5 py-3 text-xl outline-none bg-transparent placeholder:text-gray-400"
            />
            <button className="border-2 border-none rounded-full px-5 py-3 mt-5 text-xl bg-[rgb(66,63,228)] text-white hover:bg-[rgb(87,86,145)] active:bg-[rgb(23,22,95)]">
              Login
            </button>
            <div className="mt-3">
              <p className="text-white">
                Don't have an account?
                <span className="text-[rgb(66,63,228)]">
                  <Link to="/signin">Sign-up</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
         
      </div>
    </>
  );
};

export default LoginPage;
