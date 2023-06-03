import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register, Home, InputData, Proses, About } from "./Pages";

import PrivateRoutes from "./Routes/PrivateRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/input-data" element={<InputData />}></Route>
      <Route path="/proses" element={<Proses />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="" element={<PrivateRoutes />}></Route>
    </Routes>
  );
}
