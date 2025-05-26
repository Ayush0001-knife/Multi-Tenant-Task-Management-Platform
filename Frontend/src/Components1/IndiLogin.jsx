import axios from "axios";
import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { ManagerActions } from "../ReduxStore/Manager";
import { isAuthorizedActions } from "../ReduxStore/isAuthorized";
import { EmployeeActions } from "../ReduxStore/Employee";

const IndiLogin = () => {
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const emailElement = useRef(null);
  const passwordElement = useRef(null);
  const keyElement = useRef(null);

  const handleLoginButtonClick = async (e) => {
    e.preventDefault();
    const email = emailElement.current.value;
    const password = passwordElement.current.value;
    const key = keyElement.current.value;

    if (email.length < 5 || password.length < 4 || key.length !== 7) {
      alert("Invalid email or password.");
      return;
    }

    const indiLoginData = {
      email,
      password,
      key,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/indi/login",
        indiLoginData
      );
      const data = response.data.Individual;

      if (response.status === 200) {
        if (response.data.Individual.role === "manager") {
          dispatch(isAuthorizedActions.setAuthorization(true));
          dispatch(ManagerActions.setManagerData(data));
          navigate("/indi-manager");
        } else {
          dispatch(isAuthorizedActions.setAuthorization(true));
          dispatch(EmployeeActions.setEmployeeData(data));
          navigate("/indi-employee");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10 backdrop-blur-lg bg-opacity-95 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-8 underline">
          Individual Login
        </h2>

        <form className="space-y-8">
          {/* Email */}
          <div className="relative">
            <input
              ref={emailElement}
              type="email"
              required
              placeholder="Enter your email"
              className={`peer w-full px-4 py-3 bg-transparent border-2 rounded-lg outline-none transition-all duration-300
            ${
              focusedInput === "email"
                ? "border-transparent"
                : "border-slate-300"
            } placeholder-transparent`}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
              Email
            </label>
            {focusedInput === "email" && (
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

          {/* Password */}
          <div className="relative">
            <input
              ref={passwordElement} // Added ref
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              className={`peer w-full px-4 py-3 pr-10 bg-transparent border-2 rounded-lg outline-none transition-all duration-300
            ${
              focusedInput === "password"
                ? "border-transparent"
                : "border-slate-300"
            } placeholder-transparent`}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
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

          {/* 7-digit Key */}
          <div className="relative">
            <input
              ref={keyElement} // Added ref
              type="text"
              required
              maxLength="7"
              pattern="\d{7}"
              placeholder="Enter 7-digit organization key"
              className={`peer w-full px-4 py-3 bg-transparent border-2 rounded-lg outline-none transition-all duration-300
            ${
              focusedInput === "key" ? "border-transparent" : "border-slate-300"
            } placeholder-transparent`}
              onFocus={() => setFocusedInput("key")}
              onBlur={() => setFocusedInput(null)}
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
              7-Digit Organization Key
            </label>
            {focusedInput === "key" && (
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

          <Link
            to="/indi-register"
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-sm font-medium transition-colors duration-200"
          >
            Or Register as new Individual ?
          </Link>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold mt-6"
            onClick={handleLoginButtonClick}
          >
            Login
          </button>
          <Link
            to="/org-login"
            className="w-full bg-gradient-to-r from-pink-500 to-pink-400 text-white py-3 px-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold mt-4 shadow-md cursor-pointer"
          >
            Login as Organization
          </Link>
        </form>
      </div>
    </div>
  );
};

export default IndiLogin;
