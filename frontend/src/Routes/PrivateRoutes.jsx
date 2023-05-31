import React, { useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AuthContext from "../store/Auth-Context";

export default function PrivateRoutes() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/dashboard");
    } else {
      alert("You are not logged in!");
      navigate("/");
    }
  });

  return (
    <div>
      <Outlet />
    </div>
  );
}
