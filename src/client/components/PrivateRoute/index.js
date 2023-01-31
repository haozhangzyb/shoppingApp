import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  if (isLoading) return <p>loading...</p>;
  if (isAuthenticated) return <Component {...props} />;

  return <Navigate to='/error' />;
};

export default PrivateRoute;
