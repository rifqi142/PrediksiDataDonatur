import React from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Table } from "react-bootstrap";
import "./about.css";

import profile from "../../Assets/profile-pembuat.jpg";

export default function About() {
  return (
    <section id="about-pages">
      <Sidebar />
      <div className="right-content">
        <Card border="info">
          <Card.Header> Tentang Website ini</Card.Header>
          <Card.Body>
            <Card.Text className="sub-title">
              Website ini merupakan website sederhana yang betujuan untuk
              memprediksi data donatur melalui data time series menggunakan
              algoritma Long Short-Term Memory
            </Card.Text>
            <hr />
            <Card.Img variant="top" className="profile" src={profile} />
            <Card.Text className="mt-3">
              <Table striped bordered hover responsive="lg">
                <thead>
                  <tr className="biodata">
                    <th colSpan="2">Biodata Pembuat</th>
                  </tr>
                  <tr>
                    <th>Nama</th>
                    <td>Muhammad Rifqi Setiawan</td>
                  </tr>
                  <tr>
                    <th>NIM</th>
                    <td>1911500682</td>
                  </tr>
                  <tr>
                    <th>Program Studi </th>
                    <td>Teknik Informatika</td>
                  </tr>
                  <tr>
                    <th>Peminatan</th>
                    <td>Programming Expert</td>
                  </tr>
                </thead>
              </Table>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}
