import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
}
