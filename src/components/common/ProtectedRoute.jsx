import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ user }) {
  if (!user) return <Navigate to={"/login"} replace />;
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
