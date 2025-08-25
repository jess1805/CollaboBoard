import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Use the EXACT same key here
  const token = localStorage.getItem("whiteboard_user_token"); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;