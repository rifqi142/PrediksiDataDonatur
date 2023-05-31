import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register, Dashboard } from "./Pages";

import PrivateRoutes from "./Routes/PrivateRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

      <Route path="" element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
}
