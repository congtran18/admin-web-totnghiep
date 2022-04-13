import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminLoading } from 'app/components'

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading)  
    return (
      <>
        <AdminLoading />
      </>
    );

  if (user) return children;
  return <Navigate to="/session/signin" />;
};

export default PrivateRoute;