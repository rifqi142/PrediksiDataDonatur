import React, { useState, useEffect } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

import { SlLogout } from "react-icons/sl";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`/1`);
        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    const logoutConfirmation = window.confirm(
      "Apakah Anda yakin ingin logout?"
    );

    if (logoutConfirmation) {
      alert("Anda telah logout");
      navigate("/");
    }
  };

  return (
    <section id="sidebar-components">
      <div
        style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#006D25">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/home"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Prediction LSTM
            </a>
            <p style={{ textAlign: "center" }}>Welcome, {user}</p>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/home">
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/input-data">
                <CDBSidebarMenuItem icon="table">Input Data</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/proses-data">
                <CDBSidebarMenuItem icon="chart-bar">
                  Proses Data
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/evanluasi">
                <CDBSidebarMenuItem icon="chart-line">
                  Evaluasi
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/about">
                <CDBSidebarMenuItem icon="user">About</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/">
                <CDBSidebarMenuItem onClick={handleLogout}>
                  <SlLogout />
                  &nbsp; &nbsp; &nbsp;Logout
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              Dompet Dhuafa LSTM
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </section>
  );
};

export default Sidebar;
