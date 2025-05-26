import { createSlice } from "@reduxjs/toolkit";

const ManagarSlice = createSlice({
  name: "ManagerData",
  initialState: {
    name: localStorage.getItem("managerName") || "",
    email: localStorage.getItem("managerEmail") || "",
    key: Number(localStorage.getItem("managerKey")) || 0,
  },
  reducers: {
    setManagerData: (state, action) => {
      const { name, email, key } = action.payload;
      state.name = name;
      state.email = email;
      state.key = Number(key);

      // Persist to localStorage
      localStorage.setItem("managerName", name);
      localStorage.setItem("managerEmail", email);
      localStorage.setItem("managerKey", key);
    },
    clearManagerData: (state) => {
      state.name = "";
      state.email = "";
      state.key = 0;

      localStorage.removeItem("managerName");
      localStorage.removeItem("managerEmail");
      localStorage.removeItem("managerKey");
    },
  },
});

export const ManagerActions = ManagarSlice.actions;
export default ManagarSlice;