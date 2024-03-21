import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute({ user }) {
  const location = useLocation();

  console.log("location==>", location);

  if (!user)
    return (
      <Navigate
        to={"/login"}
        replace={true}
        state={(location.state = location.pathname)}
      />
    );
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
