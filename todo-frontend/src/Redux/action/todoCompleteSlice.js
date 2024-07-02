import { createSlice } from "@reduxjs/toolkit";

const todoCompleteSlice = createSlice({
  name: "todosComplete",
  initialState: {
    todosComplete: [],
  },

  reducers: {
    getTodosComplete: (state, action) => {
      state.todosComplete = action.payload.map((item) => {
        return {
          id: item._id,
          date: item.date,
          email: item.email,
          title: item.title,
          details: item.details,
        };
      });
    },

    addTodosComplete: (state, action) => {
      state.employees.push(action.payload);
    },

    deleteTodosComplete: (state, action) => {
      const id = action.payload.id;
      state.todosComplete = state.todosComplete.filter(
        (item) => item.id !== id
      );
    },
  },
});

export const { addTodosComplete, getTodosComplete, deleteTodosComplete } =
  todoCompleteSlice.actions;

export default todoCompleteSlice.reducer;
