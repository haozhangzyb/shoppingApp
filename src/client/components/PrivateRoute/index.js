import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { userType as userTypeConstants } from "../../Constants";

const PrivateRoute = ({ component: Component, ...props }) => {
  const userType = useSelector((state) => state.authReducer.userType);
  const isAdmin = userType === userTypeConstants.ADMIN;
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  if (isLoading) return <p>loading...</p>;
  if (isAdmin) return <Component {...props} />;

  return <Navigate to='/error' />;
};

export default PrivateRoute;
