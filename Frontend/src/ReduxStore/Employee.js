import { createSlice } from "@reduxjs/toolkit";

const EmployeeSlice = createSlice({
  name: "EmployeeData",
  initialState: {
    name: localStorage.getItem("employeeName") || "",
    email: localStorage.getItem("employeeEmail") || "",
    key: Number(localStorage.getItem("employeeKey")) || 0,
  },
  reducers: {
    setEmployeeData: (state, action) => {
      const { name, email, key } = action.payload;
      state.name = name;
      state.email = email;
      state.key = Number(key);

      localStorage.setItem("employeeName", name);
      localStorage.setItem("employeeEmail", email);
      localStorage.setItem("employeeKey", key);
    },
    clearEmployeeData: (state) => {
      state.name = "";
      state.email = "";
      state.key = 0;

      localStorage.removeItem("employeeName");
      localStorage.removeItem("employeeEmail");
      localStorage.removeItem("employeeKey");
    },
  },
});

export const EmployeeActions = EmployeeSlice.actions;
export default EmployeeSlice;
