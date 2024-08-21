import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// Outlet helps to render the child inside the parent route
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return <div>{currentUser ? <Outlet /> : <Navigate to="/signin" />}</div>;
}
