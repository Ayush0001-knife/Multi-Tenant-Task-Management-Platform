import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isAuthorizedActions } from "../ReduxStore/isAuthorized";
import { ManagerActions } from "../ReduxStore/Manager";
import { EmployeeActions } from "../ReduxStore/Employee";

const IndiRegister = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState("employee"); // Add state for role selection
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameElement = useRef(null);
  const emailElement = useRef(null);
  const password1Element = useRef(null);
  const pasword2Element = useRef(null);
  const keyElement = useRef(null);

  const handleRegisterButtonClick = async (e) => {
    e.preventDefault();
    const name = nameElement.current.value;
    const email = emailElement.current.value;
    const password1 = password1Element.current.value;
    const password2 = pasword2Element.current.value;
    const key = keyElement.current.value;

    if (
      name.length < 3 ||
      email.length < 5 ||
      password1.length < 4 ||
      password2.length < 4 ||
      key.length < 7 ||
      password1 != password2
    ) {
      alert("Invalid Inputs");
      return;
    }

    const indiRegisterData = {
      name,
      email,
      password: password1,
      role,
      key,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/indi/register",
        indiRegisterData
      );

      const data = response.data.Individual;
      if (response.status === 201) {
        if (response.data.Individual.role === "manager") {
          dispatch(isAuthorizedActions.setAuthorization(true));
          dispatch(ManagerActions.setManagerData(data));
          navigate("/indi-manager");
          return;
        } else {
          dispatch(isAuthorizedActions.setAuthorization(true));
          dispatch(EmployeeActions.setEmployeeData(data));
          navigate("/indi-employee");
        }
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      alert("Registration failed. Please try again.");
    }

    // nameElement.current.value = "";
    // emailElement.current.value = "";
    // password1Element.current.value = "";
    // pasword2Element.current.value = "";
    // keyElement.current.value = "";
    // setRole("employee");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10 backdrop-blur-lg bg-opacity-95 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-8 underline">
          Individual Registration
        </h2>

        <form className="space-y-8">
          <div className="relative">
            <input
              ref={nameElement}
              type="text"
              placeholder="Enter your name"
              className={`peer w-full px-4 py-3 bg-transparent border-2 rounded-lg outline-none transition-all duration-300 
              ${
                focusedInput === "name"
                  ? "border-transparent"
                  : "border-slate-300"
              } placeholder-transparent`}
              required
              onFocus={() => setFocusedInput("name")}
              onBlur={() => setFocusedInput(null)}
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
              Name
            </label>
            {focusedInput === "name" && (
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
              ref={emailElement}
              type="email"
              placeholder="Enter your email"
              className={`peer w-full px-4 py-3 bg-transparent border-2 rounded-lg outline-none transition-all duration-300 
              ${
                focusedInput === "email"
                  ? "border-transparent"
                  : "border-slate-300"
              } placeholder-transparent`}
              required
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

          <div className="relative">
            <input
              ref={password1Element}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`peer w-full px-4 py-3 pr-10 bg-transparent border-2 rounded-lg outline-none transition-all duration-300 
              ${
                focusedInput === "password"
                  ? "border-transparent"
                  : "border-slate-300"
              } placeholder-transparent`}
              required
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

          <div className="relative">
            <input
              ref={pasword2Element}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              className={`peer w-full px-4 py-3 pr-10 bg-transparent border-2 rounded-lg outline-none transition-all duration-300 
              ${
                focusedInput === "confirm"
                  ? "border-transparent"
                  : "border-slate-300"
              } placeholder-transparent`}
              required
              onFocus={() => setFocusedInput("confirm")}
              onBlur={() => setFocusedInput(null)}
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
              Confirm Password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
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

          <div className="relative">
            <input
              ref={keyElement}
              type="text"
              maxLength="7"
              minLength="7"
              placeholder="Enter organization key"
              className={`peer w-full px-4 py-3 bg-transparent border-2 rounded-lg outline-none transition-all duration-300 
              ${
                focusedInput === "key"
                  ? "border-transparent"
                  : "border-slate-300"
              } placeholder-transparent`}
              required
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

          <div className="flex space-x-6 items-center justify-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-blue-500 h-5 w-5"
                name="role"
                value="manager"
                checked={role === "manager"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="ml-2 text-gray-700">Manager</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-blue-500 h-5 w-5"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="ml-2 text-gray-700">Employee</span>
            </label>
          </div>

          <Link
            to="/indi-login"
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-sm font-medium transition-colors duration-200"
          >
            Already have an Account. Login ?
          </Link>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold mt-3"
            onClick={handleRegisterButtonClick}
          >
            Register
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

export default IndiRegister;
