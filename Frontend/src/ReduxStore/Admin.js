import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if exists
const loadInitialState = () => {
  const savedState = localStorage.getItem('adminData');
  return savedState ? JSON.parse(savedState) : {
    name: "",
    email: "",
    key: 0,
  };
};

const adminSlice = createSlice({
  name: "AdminData", 
  initialState: loadInitialState(),
  reducers: {
    setAdminData: (state, action) => {
      const { name, email, key } = action.payload;
      // Only update if values are not empty/undefined
      state.name = name || state.name;
      state.email = email || state.email;
      state.key = key !== undefined ? Number(key) : state.key;
      
      localStorage.setItem('adminData', JSON.stringify({
        name: state.name,
        email: state.email,
        key: state.key
      }));
    },
    clearAdminData: (state) => {
      state.name = "";
      state.email = "";
      state.key = 0;
      localStorage.removeItem('adminData');
    }
  }
})

export const AdminActions = adminSlice.actions;
export default adminSlice;