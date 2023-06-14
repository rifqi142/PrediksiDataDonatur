import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./home.css";
import banner from "../../Assets/banner-home.png";
import Sidebar from "../../Components/sidebar/sidebar";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/get-data`);
        console.log(res.data.data);
        setData(res.data.data); // Assuming the fetched data is an array and stored in 'data'
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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
        {data.map((master) => (
          <Card key={master.id}>
            <Card.Body>
              <Card.Title>{master.judul}</Card.Title>
              <Card.Text>
                {master.hasil === 0 ? (
                  <p></p>
                ) : (
                  <Button variant="success">Lihat Hasil</Button>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
}
