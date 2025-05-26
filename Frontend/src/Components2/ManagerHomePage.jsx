import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ManagerActions } from "../ReduxStore/Manager";
import { useNavigate } from "react-router-dom";
import Notification from "../Components1/PopupNotification";
import { isAuthorizedActions } from "../ReduxStore/isAuthorized";

const ManagerHomePage = () => {
  const ManagerData = useSelector((store) => store.ManagerData);
  const [employees, setEmployees] = useState([]);
  const [assignTo, setAssignTO] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const titleElement = useRef(null);
  const deadlineElement = useRef(null);
  const categoryElement = useRef(null);
  const descriptionElement = useRef(null);
  const assignToElement = useRef(null);

  const handleCreateTaskButtonClick = async () => {
    const taskTitle = titleElement.current.value;
    const assignTo = assignToElement.current.value;
    const deadline = deadlineElement.current.value;
    const category = categoryElement.current.value;
    const taskDescription = descriptionElement.current.value;
    const managerEmail = ManagerData.email;
    const employeeEmail = employees.find(
      (employee) => employee.name === assignTo
    )?.email;
    const key = ManagerData.key;

    const taskData = {
      managerEmail,
      assignTo,
      employeeEmail,
      key,
      taskData: {
        taskTitle,
        deadline,
        taskDescription,
        category,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/task/new",
        taskData
      );
      if (response.status === 200) {
        setNotificationMessage("Task Assigned Successfully");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
      }
    } catch (error) {
      console.error("Failed to create task:", error.message);
    }

    titleElement.current.value = "";
    deadlineElement.current.value = "";
    categoryElement.current.value = "";
    descriptionElement.current.value = "";
    assignToElement.current.value = "";
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/indi/getdata",
          {
            key: ManagerData.key,
          }
        );
        setEmployees(response.data.individuals || []);
      } catch (error) {
        console.error("Failed to load employees:", error.message);
      }
    };

    if (ManagerData?.key) fetchEmployees();
  }, [ManagerData?.key]);

  const hanldeLogOutButtonClick = () => {
    dispatch(ManagerActions.clearManagerData());
    dispatch(isAuthorizedActions.setAuthorization(false));
    navigate("/indi-login");
  };

  return (
    <>
      {showNotification && (
        <Notification
          message={notificationMessage}
          bgColor="bg-green-500"
          duration={4000}
        />
      )}

      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-slate-900 text-white">
        <div className="flex justify-between items-center px-8 py-6 border-b border-indigo-700 bg-opacity-90 backdrop-blur-sm">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent"
            onClick={() => {
              console.log(ManagerData);
            }}
          >
            Hello {ManagerData.name} 🧑‍💼
          </h1>
          <button
            className="bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={hanldeLogOutButtonClick}
          >
            Log out
          </button>
        </div>

        <div className="max-w-6xl mx-auto mt-16 bg-gradient-to-br from-slate-800 to-indigo-900 p-10 rounded-xl shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block mb-2 font-semibold text-lg text-teal-300">
                  Task Title
                </label>
                <input
                  type="text"
                  ref={titleElement}
                  placeholder="Make a UI design etc..."
                  className="w-full px-5 py-3 rounded-lg bg-slate-700 border-2 border-indigo-600 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-lg text-teal-300">
                    Deadline
                  </label>
                  <input
                    type="date"
                    ref={deadlineElement}
                    className="w-full px-5 py-3 rounded-lg bg-slate-700 border-2 border-indigo-600 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-lg text-teal-300">
                    Category
                  </label>
                  <input
                    type="text"
                    ref={categoryElement}
                    placeholder="Design, Dev, etc"
                    className="w-full px-5 py-3 rounded-lg bg-slate-700 border-2 border-indigo-600 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-lg text-teal-300">
                  Assign To
                </label>
                <input
                  type="text"
                  value={assignTo}
                  ref={assignToElement}
                  readOnly
                  onChange={(e) => setAssignTO(e.target.value)}
                  placeholder="Employee Name"
                  className="w-full px-5 py-3 rounded-lg bg-slate-700 border-2 border-indigo-600 placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-all duration-300"
                />
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-teal-300 mb-3">
                  Available Employees
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {employees.map((employee) => (
                    <div
                      key={employee.email}
                      className={`bg-slate-700 border-2 border-indigo-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-slate-600 transition-colors duration-200 ${
                        assignTo === employee.name
                          ? "bg-indigo-600 text-white"
                          : ""
                      }`}
                      onClick={() => setAssignTO(employee.name)}
                    >
                      {employee.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
              <div>
                <label className="block mb-2 font-semibold text-lg text-teal-300">
                  Description
                </label>
                <textarea
                  rows="12"
                  ref={descriptionElement}
                  placeholder="Task details here..."
                  className="w-full px-5 py-3 rounded-lg bg-slate-700 border-2 border-indigo-600 placeholder-slate-400 resize-none focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-all duration-300"
                ></textarea>
              </div>

              <div>
                <button
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-bold py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={handleCreateTaskButtonClick}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerHomePage;
