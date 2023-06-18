import React from "react";
import { Card } from "react-bootstrap";
import "./home.css";
import banner from "../../Assets/banner-home.png";
import Sidebar from "../../Components/sidebar/sidebar";

export default function Home() {
  return (
    <section id="home-pages">
      <div className="left-content">
        <Sidebar />
      </div>
      <div className="right-content">
        <Card>
          <Card.Img variant="top" className="banner-app" src={banner} />
          <br />
          <Card.Body>
            <Card.Title>Home Pages</Card.Title>
            <Card.Text>
              Selamat datang di website prediksi data donatur menggunakan metode
              LSTM
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}
