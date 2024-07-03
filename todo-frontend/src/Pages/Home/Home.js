import React, { useEffect, useState } from "react";
import "./Home.css";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import useFirebase from "../../Hooks/useFirebase";

const Home = () => {
  const [isOpen, setIsopen] = useState();
  const { userInfo, adminEmail, handleLogout } = useFirebase();
  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  useEffect(() => {
    if (window.innerWidth <= 820) {
      return setIsopen(false);
    } else {
      return setIsopen(true);
    }
  }, []);

  return (
    <>
      <div>
        <div className={`sidebar ${isOpen === true ? "active" : ""}`}>
          <div className="logo_content" style={{ marginBottom: "40px" }}>
            <div className="logo">
              <div className="logoname" style={{ margin: "5px" }}>
                <p
                  style={{
                    margin: "22px 0px 0px 5px",
                    height: "40px",
                    width: "120px",
                    fontSize: "1.3rem",
                  }}
                >
                  Todo Helper
                </p>
              </div>
            </div>
            <i
              className="fa-solid fa-bars"
              id="btn"
              style={{ fontSize: "20px" }}
              onClick={ToggleSidebar}
            ></i>
          </div>
          <ul className="nav_list">
            <li>
              <NavLink to="user-profile">
                <i className="fa-solid fa-id-card"></i>
                <span className="link_names">Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="">
                <i className="fa-solid fa-table-cells"></i>
                <span className="link_names">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="todo-list">
                <i className="fa-solid fa-list"></i>
                <span className="link_names">Todo List</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="todo-complete">
                <i className="fa-regular fa-square-check"></i>
                <span className="link_names">Complete</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="todo-incomplete">
                <i className="fa-solid fa-spinner"></i>
                <span className="link_names">Incomplete</span>
              </NavLink>
            </li>

            {userInfo.email === adminEmail && (
              <li>
                <NavLink to="users">
                  <i className="fa-solid fa-users"></i>
                  <span className="link_names">Users</span>
                </NavLink>
              </li>
            )}
          </ul>

          <div className="profile_content">
            <div className="profile">
              <div className="profile_details"></div>

              <div>
                <i
                  className="fa-solid fa-arrow-right-from-bracket"
                  id="log_out"
                  onClick={handleLogout}
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div className="home_content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
