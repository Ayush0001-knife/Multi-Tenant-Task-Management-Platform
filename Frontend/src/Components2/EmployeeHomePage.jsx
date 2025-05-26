import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isAuthorizedActions } from "../ReduxStore/isAuthorized";
import { EmployeeActions } from "../ReduxStore/Employee";
import { useNavigate } from "react-router-dom";

const taskSections = [
  {
    title: "New Tasks",
    status: "New Task",
    color: "from-cyan-400 to-blue-500",
    icon: "🆕",
  },
  {
    title: "Active Tasks",
    status: "Active Task",
    color: "from-amber-700 to-orange-500",
    icon: "⚡",
  },
  {
    title: "Completed Tasks",
    status: "Completed Task",
    color: "from-emerald-400 to-green-500",
    icon: "✅",
  },
  {
    title: "Failed Tasks",
    status: "Failed Task",
    color: "from-rose-400 to-red-500",
    icon: "❌",
  },
];

const EmployeeHomePage = () => {
  const EmployeeData = useSelector((store) => store.EmployeeData);
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!EmployeeData.email || !EmployeeData.key) return;

    const fetchTasks = async () => {
      try {
        const response = await axios.post("http://localhost:3001/task/getall", {
          employeeEmail: EmployeeData.email,
          key: EmployeeData.key,
        });

        setTasks(response.data.Tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error.message);
      }
    };

    fetchTasks();
  }, [EmployeeData.email, EmployeeData.key]);

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleLogoutButtonClick = () => {
    dispatch(EmployeeActions.clearEmployeeData());
    dispatch(isAuthorizedActions.setAuthorization(false));
    navigate("/indi-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-10 px-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-12 px-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-400 via-teal-400 to-indigo-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">
          Hello {EmployeeData.name} 👨‍💻
        </h1>
        <button
          className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white px-8 py-3 rounded-xl shadow-lg shadow-rose-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-rose-500/30 active:scale-95"
          onClick={handleLogoutButtonClick}
        >
          Log out
        </button>
      </div>

      {/* Task Sections */}
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {taskSections.map((section) => (
            <div
              key={section.title}
              className={`bg-gradient-to-br ${section.color} rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group`}
            >
              <h2 className="text-3xl font-bold mb-6 border-b border-white/20 pb-3 flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                {section.icon} {section.title}
              </h2>
              <ul className="space-y-4">
                {getTasksByStatus(section.status).map((task) => (
                  <li
                    key={task._id}
                    className="bg-black/30 backdrop-blur-sm rounded-xl p-4 shadow-inner border border-white/5 transform transition-all duration-300 hover:translate-x-2 hover:bg-black/40"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">
                        📌 {task.taskData.taskTitle}
                      </h3>
                      <span className="bg-white/20 rounded-full px-3 py-1 text-sm">
                        {task.taskData.category}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/80 line-clamp-2">
                      {task.taskData.taskDescription}
                    </p>
                    <div className="flex gap-3 mt-3 text-sm opacity-80 font-light">
                      <span className="bg-white/10 rounded-full px-3 py-1">
                        Deadline: {formatDate(task.taskData.deadline)}
                      </span>
                      <span className="bg-white/10 rounded-full px-3 py-1">
                        Assigned: {formatDate(task.taskData.date)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
