import React from "react";
import { Navigate, useLocation } from "react-router";
import useFirebase from "../Hooks/useFirebase";
import Loading from "../Loading/Loading";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { userInfo, users, adminEmail, loading } = useFirebase();

  const userRole = users.filter((item) => item.role === "admin");

  if (loading) {
    return (
      <div style={{ marginTop: "20rem" }}>
        <Loading />
      </div>
    );
  }

  if (userInfo.email && userRole) {
    return children;
  } else {
    return <Navigate state={{ from: location }} to="/" />;
  }
};

export default AdminRoute;
