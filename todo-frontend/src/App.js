import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import TodoList from "./Pages/TodoList/TodoList";
import Complete from "./Pages/Complete/Complete";
import Incomplete from "./Pages/Incomplete/Incomplete";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Users from "./Pages/Users/Users";
import AdminRoute from "./ProtectedRoute/AdminRoute";
import PrivateRoute from "./ProtectedRoute/PrivateRoute";
import AddTodoList from "./Pages/TodoList/AddTodoList";
import UpdateTodoList from "./Pages/TodoList/UpdateTodoList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      // Disable F12
      if (event.keyCode === 123) {
        event.preventDefault();
      }

      // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        (event.ctrlKey &&
          event.shiftKey &&
          (event.keyCode === 73 ||
            event.keyCode === 74 ||
            event.keyCode === 67)) ||
        (event.ctrlKey && event.keyCode === 85)
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route
              path=""
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="user-profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="todo-list"
              element={
                <PrivateRoute>
                  <TodoList />
                </PrivateRoute>
              }
            />

            <Route
              path="/add-todo"
              element={
                <PrivateRoute>
                  <AddTodoList />
                </PrivateRoute>
              }
            />

            <Route
              path="/update-todo/:id"
              element={
                <PrivateRoute>
                  <UpdateTodoList />
                </PrivateRoute>
              }
            />

            <Route
              path="todo-complete"
              element={
                <PrivateRoute>
                  <Complete />
                </PrivateRoute>
              }
            />
            <Route
              path="todo-incomplete"
              element={
                <PrivateRoute>
                  <Incomplete />
                </PrivateRoute>
              }
            />
            <Route
              path="users"
              element={
                <AdminRoute>
                  <Users />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </Router>

      <ToastContainer position="top-right" />
    </>
  );
}
export default App;
