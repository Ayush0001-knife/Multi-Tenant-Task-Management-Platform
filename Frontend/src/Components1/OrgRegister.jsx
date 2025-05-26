import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminActions } from "../ReduxStore/Admin";
import { isAuthorizedActions } from "../ReduxStore/isAuthorized";
import { useDispatch } from "react-redux";

const OrgRegister = () => {
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const nameElement = useRef(null);
  const emailElement = useRef(null);
  const password1Element = useRef(null);
  const password2Element = useRef(null);

  const handleRegisterButtonClick = async (e) => {
    e.preventDefault();
    const name = nameElement.current.value.trim();
    const email = emailElement.current.value.trim();
    const password1 = password1Element.current.value;
    const password2 = password2Element.current.value;

    if (name.length < 3) {
      alert("Name must be at least 3 characters long");
      return;
    }
    if (email.length < 5) {
      alert("Email must be at least 5 characters long");
      return;
    }
    if (password1.length < 4) {
      alert("Password must be at least 4 characters long");
      return;
    }
    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }

    const orgRegisterData = {
      name,
      email,
      password: password1,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/org/register",
        orgRegisterData
      );
      const data = response.data.organization;
      if (response.status === 201) {
        dispatch(AdminActions.setAdminData(data));
        dispatch(isAuthorizedActions.setAuthorization(true));
        navigate("/admin");
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      alert("Registration failed. Please try again.");
    }

    nameElement.current.value = "";
    emailElement.current.value = "";
    password1Element.current.value = "";
    password2Element.current.value = "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10 backdrop-blur-lg bg-opacity-95 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8 underline">
          Organization Registration
        </h2>

        <form className="space-y-8" onSubmit={handleRegisterButtonClick}>
          {/* Organization Name */}
          <div className="relative">
            <input
              ref={nameElement}
              type="text"
              required
              className={`peer w-full px-4 py-3 bg-transparent border-2 rounded-lg outline-none transition-all duration-300 
                ${
                  focusedInput === "org"
                    ? "border-transparent"
                    : "border-slate-300"
                }
                placeholder-transparent`}
              placeholder="Enter organization name"
              onFocus={() => setFocusedInput("org")}
              onBlur={() => setFocusedInput(null)}
            />
            <label
              className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 
              peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
              peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Organization Name
            </label>
            {focusedInput === "org" && (
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

          {/* Email */}
          <div className="relative">
            <input
              ref={emailElement}
              type="email"
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
              ref={password1Element}
              type={showPassword ? "text" : "password"}
              required
              className={`peer w-full px-4 py-3 pr-10 bg-transparent border-2 rounded-lg outline-none transition-all duration-300
                ${
                  focusedInput === "password"
                    ? "border-transparent"
                    : "border-slate-300"
                }
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

          {/* Confirm Password */}
          <div className="relative">
            <input
              ref={password2Element}
              type={showConfirm ? "text" : "password"}
              required
              className={`peer w-full px-4 py-3 pr-10 bg-transparent border-2 rounded-lg outline-none transition-all duration-300
                ${
                  focusedInput === "confirm"
                    ? "border-transparent"
                    : "border-slate-300"
                }
                placeholder-transparent`}
              placeholder="Confirm your password"
              onFocus={() => setFocusedInput("confirm")}
              onBlur={() => setFocusedInput(null)}
            />
            <label
              className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300
              peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
              peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Confirm Password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black-400 hover:text-black-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
            {focusedInput === "confirm" && (
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
            to="/org-login"
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-sm font-medium transition-colors duration-200"
          >
            Already have an account? Login
          </Link>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold mt-4 shadow-md text-center"
          >
            Register
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

export default OrgRegister;
