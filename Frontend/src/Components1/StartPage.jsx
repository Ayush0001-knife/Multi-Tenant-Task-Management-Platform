import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <>
      <header className="w-full bg-gradient-to-r from-slate-800 to-slate-700 backdrop-blur-lg border-b border-slate-700/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUe_jTj3ALO_b-MhC_1bFhQtuXVrx9vc9MKA&s"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-blue-400/30 hover:border-blue-400 transition-all duration-300"
            />
            <span className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 hidden sm:block cursor-pointer">
              Multi-Tenant Task Management Platform
            </span>
          </div>

          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-300">
            <a className="hover:text-blue-400 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full cursor-pointer">
              About-us
            </a>
            <a className="hover:text-blue-400 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full cursor-pointer">
              Solutions
            </a>
            <a className="hover:text-blue-400 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full cursor-pointer">
              Team
            </a>
          </div>

          <Link
            to="/first-page"
            className="w-fit flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-sm group cursor-pointer"
          >
            Get Started
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </nav>
      </header>
      <main className="w-full">
        <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 gap-10">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Multi-tenant <br />
              Task Management <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                Management Platform
              </span>
            </h1>
            <p className="text-gray-600 max-w-md mb-6">
              Increased productivity and collaboration workflows across multiple
              tenants.
            </p>
            <Link
              to="/first-page"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-sm group cursor-pointer"
            >
              Get Started
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/SideImage.png"
              alt="Dashboard Preview"
              className="rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-sm"
            />
          </div>
        </section>

        <div className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">Project Managertivity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              <div>
                <div className="text-3xl mb-2">📝</div>
                <h3 className="text-lg font-semibold mb-1">Task Management</h3>
                <p className="text-sm text-slate-400">Inventory factors</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📁</div>
                <h3 className="text-lg font-semibold mb-1">
                  Project Management
                </h3>
                <p className="text-sm text-slate-400">Tools & planning</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="text-lg font-semibold mb-1">
                  Team Collaborations
                </h3>
                <p className="text-sm text-slate-400">Individual focus</p>
              </div>
              <div>
                <div className="text-3xl mb-2">👥</div>
                <h3 className="text-lg font-semibold mb-1">
                  Team Collaboration
                </h3>
                <p className="text-sm text-slate-400">Process overview</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default StartPage;
