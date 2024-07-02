import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },

  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload.map((item) => {
        return {
          id: item._id,
          date: item.date,
          email: item.email,
          title: item.title,
          details: item.details,
        };
      });
    },

    addTodos: (state, action) => {
      state.employees.push(action.payload);
    },

    updateTodos: (state, action) => {
      const updateTodoData = state.todos.find(
        (item) => item.id === action.payload.id
      );
      state.todos[updateTodoData] = {
        id: action.payload.id,
        date: action.payload.date,
        email: action.payload.email,
        title: action.payload.title,
        details: action.payload.details,
      };
    },

    deleteTodos: (state, action) => {
      const id = action.payload.id;
      state.todos = state.todos.filter((item) => item.id !== id);
    },
  },
});

export const { addTodos, getTodos, updateTodos, deleteTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
