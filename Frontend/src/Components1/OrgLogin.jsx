import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Added missing axios import
import { useDispatch } from "react-redux";
import { AdminActions } from "../ReduxStore/Admin";
import { isAuthorizedActions } from "../ReduxStore/isAuthorized";

const OrgLogin = () => {
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const emailElement = useRef(null);
  const passwordElement = useRef(null);
  const keyElement = useRef(null);

  const handleLoginButtonClick = async (e) => {
    e.preventDefault();

    const email = emailElement.current.value.trim();
    const password = passwordElement.current.value.trim();
    const key = parseInt(keyElement.current.value.trim(), 10);

    if (!email || !password || !key) {
      alert("Please fill in all fields");
      return;
    }

    if (isNaN(key)) {
      alert("Please enter a valid numeric token");
      return;
    }

    const orgLoginData = {
      email,
      password,
      key,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/org/login",
        orgLoginData
      );
      const data = response.data.organization;

      if (response.status === 200) {
        dispatch(AdminActions.setAdminData(data));
        dispatch(isAuthorizedActions.setAuthorization(true));
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please try again.");
    }

    emailElement.current.value = "";
    passwordElement.current.value = "";
    keyElement.current.value = "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10 backdrop-blur-lg bg-opacity-95 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8 underline">
          Organization Login
        </h2>

        <form className="space-y-8">
          <div className="relative">
            <input
              type="email"
              ref={emailElement} // Added missing ref
              required
              className={`peer w-full px-4 py-3 bg-transparent border-2 rounded-lg outline-none transition-all duration-300 
                ${
                  focusedInput === "email"
                    ? "border-transparent"
                    : "border-slate-300"
                }
                placeholder-transparent`}
              placeholder="Enter your email"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
            <label
              className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 
              peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
              peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Email
            </label>
            {focusedInput === "email" && (
              <div
                className="absolute inset-0 rounded-lg animate-border-flow"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)",
                  backgroundSize: "200% 100%",
                  zIndex: -1,
                  padding: "2px",
                }}
              />
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              ref={passwordElement} // Added missing ref
              required
              className={`peer w-full px-4 py-3 pr-10 bg-transparent border-2 rounded-lg outline-none transition-all duration-300
      ${focusedInput === "password" ? "border-transparent" : "border-slate-300"}
      placeholder-transparent`}
              placeholder="Enter your password"
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <label
              className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300
    peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
    peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black-400 hover:text-black-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {focusedInput === "password" && (
              <div
                className="absolute inset-0 rounded-lg animate-border-flow pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)",
                  backgroundSize: "200% 100%",
                  zIndex: -1,
                  padding: "2px",
                }}
              />
            )}
          </div>

          <div className="relative">
            <input
              type="number"
              ref={keyElement}
              required
              pattern="\d{7}"
              maxLength="7"
              className={`peer w-full px-4 py-3 bg-transparent border-2 rounded-lg outline-none transition-all duration-300
                ${
                  focusedInput === "token"
                    ? "border-transparent"
                    : "border-slate-300"
                }
                placeholder-transparent`}
              placeholder="e.g. 1234567"
              onFocus={() => setFocusedInput("token")}
              onBlur={() => setFocusedInput(null)}
            />
            <label
              className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300
              peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
              peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
            >
              7-Digit Unique Token
            </label>
            {focusedInput === "token" && (
              <div
                className="absolute inset-0 rounded-lg animate-border-flow"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)",
                  backgroundSize: "200% 100%",
                  zIndex: -1,
                  padding: "2px",
                }}
              />
            )}
          </div>

          <Link
            to="/org-register"
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-sm font-medium transition-colors duration-200"
          >
            Or Register as new Organization ?
          </Link>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold mt-4 shadow-md cursor-pointer"
            onClick={handleLoginButtonClick}
          >
            Login
          </button>
          <Link
            to="/indi-login"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-3 px-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold mt-4 shadow-md cursor-pointer"
          >
            Login as Individual
          </Link>
        </form>
      </div>
    </div>
  );
};

export default OrgLogin;
