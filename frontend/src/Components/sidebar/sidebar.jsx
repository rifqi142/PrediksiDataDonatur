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
import { Button, Modal } from "react-bootstrap";
import { SlLogout } from "react-icons/sl";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const toggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };
  const handleLogout = () => {
    navigate("/");
  };
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

  return (
    <section id="sidebar-components">
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", height: "100vh" }}
      >
        <CDBSidebar
          textColor="#fff"
          backgroundColor="#006D25"
          style={{ overflow: "auto" }}
        >
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/home"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Prediction Data
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
              <NavLink exact to="/grafik">
                <CDBSidebarMenuItem icon="chart-line">
                  Lihat Grafik
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/history">
                <CDBSidebarMenuItem icon="history">history</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/about">
                <CDBSidebarMenuItem icon="user">About</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="#" onClick={toggleLogoutModal}>
                <CDBSidebarMenuItem>
                  <SlLogout />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout
                </CDBSidebarMenuItem>
              </NavLink>
              <Modal show={isLogoutModalOpen} onHide={toggleLogoutModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Konfirmasi Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Anda yakin ingin keluar?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={toggleLogoutModal}>
                    Tidak
                  </Button>
                  <Button variant="primary" onClick={handleLogout}>
                    Ya
                  </Button>
                </Modal.Footer>
              </Modal>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              Dompet Dhuafa Random Forest
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </section>
  );
};

export default Sidebar;
