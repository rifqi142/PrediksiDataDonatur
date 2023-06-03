import React, { useState } from "react";
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

const Sidebar = () => {
  return (
    <section id="sidebar-components">
      <div
        style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#006D25">
          {/* <CDBSidebarHeader> */}
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/home"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Prediction LSTM
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/home" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/input-data" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Input Data</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-bar">Proses</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/evanluasi" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">
                  Evaluasi
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/tentang" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Tentang</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/logout" activeClassName="activeClicked">
                <CDBSidebarMenuItem>
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
