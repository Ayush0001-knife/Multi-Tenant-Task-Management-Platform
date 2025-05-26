import { createSlice } from "@reduxjs/toolkit";


const isAuthorizedSlice = createSlice({
  name: "isAuthorized",
  initialState: {
    isAuthorized: false
  },
  reducers: {
      setAuthorization: (state, action) => {
        state.isAuthorized = action.payload;
      }
    }
    
});

export const isAuthorizedActions = isAuthorizedSlice.actions;
export default isAuthorizedSlice;
