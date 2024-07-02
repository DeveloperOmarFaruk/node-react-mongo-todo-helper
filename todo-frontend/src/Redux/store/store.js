import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../action/todoSlice";
import todoCompleteSlice from "../action/todoCompleteSlice";

const store = configureStore({
  reducer: {
    todoApp: todoSlice,
    todoCompleteApp: todoCompleteSlice,
  },
});

export default store;
