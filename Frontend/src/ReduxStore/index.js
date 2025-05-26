import {configureStore} from "@reduxjs/toolkit";
import isAuthorizedSlice from "./isAuthorized";
import ManagarSlice from "./Manager";
import EmployeeSlice from "./Employee";
import adminSlice from "./Admin";


const EMSStore = configureStore({
      reducer:{
            isAuthorized:isAuthorizedSlice.reducer,
            ManagerData:ManagarSlice.reducer,
            EmployeeData:EmployeeSlice.reducer,
            AdminData:adminSlice.reducer,
      }
})

export default EMSStore;