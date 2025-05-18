import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Password must be same");
      return;
    }

    try {
      const response = await axios.post("/forgotpassword", {
        email,
        password,
        otp,
      });
      if (response.status == 200) {
        navigate("/login");
        alert(response.data.message);
      } else {
        alert(response.data.message);
        return;
      }
    } catch (error) {
      alert("Error occured during sign-in");
    }

    setEmail("");
    setPassword("");
    setCpassword("");
    setOtp("");
  };

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        <div className="border-2 border-[rgb(66,63,228)] p-20 rounded-xl bg-black">
          <h1 className="font-semibold text-[rgb(66,63,228)] mb-3 text-center text-2xl">
            Change Password
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
              className="border-2 border-[rgb(66,63,228)] rounded-full mt-5 px-5 py-3 text-xl outline-none bg-transparent placeholder:text-gray-400"
              type="email"
              placeholder="Enter your email"
            />
            <div className="flex gap-2">
              <input
                type="button"
                value="Get OTP"
                onClick={async () => {
                  try {
                    if (!email) {
                      alert("Please enter a valid email");
                      return;
                    }
                    const response = await axios.post("/getotp", {
                      email,
                      login: true,
                    });
                    if (response) {
                      alert(response.data.message);
                    }
                  } catch (error) {
                    alert(error.message);
                  }
                }}
                className="border-2 border-none rounded-full px-2 py-1 mt-5 text-lg bg-[rgb(66,63,228)] text-white hover:bg-[rgb(87,86,145)] active:bg-[rgb(23,22,95)]"
              />

              <input
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                required
                type="password"
                placeholder="Enter OTP"
                className="border-2 border-[rgb(66,63,228)] rounded-full w-[100px] mt-5 px-2 py-1 text-lg outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>

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
            <input
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              required
              type="password"
              placeholder="Confirm your password"
              className="border-2 border-[rgb(66,63,228)] rounded-full mt-5 px-5 py-3 text-xl outline-none bg-transparent placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="border-2 border-none rounded-full px-4 py-3 mt-5 text-lg bg-[rgb(66,63,228)] text-white hover:bg-[rgb(87,86,145)] active:bg-[rgb(23,22,95)]"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
