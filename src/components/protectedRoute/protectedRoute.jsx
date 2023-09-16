import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.isAuth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedRoute;
