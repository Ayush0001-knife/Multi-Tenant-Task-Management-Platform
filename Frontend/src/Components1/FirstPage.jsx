import React from "react";
import { Link } from "react-router-dom";

const FirstPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
        Choose Your Mode of Access
      </h1>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Organization Button */}
        <Link
          to="/org-login"
          className="w-64 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Proceed as Organization Admin
          <br />
          For Admins only
        </Link>

        {/* Individual Button */}
        <Link
          to="/indi-login"
          className="w-64 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Proceed as Manager, Employee
        </Link>
      </div>
    </div>
  );
};

export default FirstPage;
