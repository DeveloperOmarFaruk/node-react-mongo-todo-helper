import React from "react";
import useFirebase from "../Hooks/useFirebase";
import { Navigate, useLocation } from "react-router";
import Loading from "../Loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { userInfo, loading } = useFirebase();

  if (loading) {
    return (
      <div style={{ marginTop: "20rem" }}>
        <Loading />
      </div>
    );
  }

  if (userInfo.email) {
    return children;
  } else {
    return <Navigate state={{ from: location }} to="/login" />;
  }
};

export default PrivateRoute;
