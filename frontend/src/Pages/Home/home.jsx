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
            <Card.Title>
              Selamat datang di website prediksi data donatur menggunakan metode
              random forest
            </Card.Title>
            <Card.Text>
              Metode Random Forest digunakan untuk pemodelan regresi disebut
              juga Random Forest Regression (RFR). Random Forest dikenalkan oleh
              Breiman pada tahun 2001. Random Forest sendiri membangun tree
              menggunakan sampel bootsrap data yang berbeda dan mengubah cara
              regresi membangun pohon. Pada pohon standar, setiap node dibagi
              menggunakan split terbaik di antara semua variabel, sedangkan pada
              Random Forest setiap node dibagi menggunakan yang terbaik diantara
              subset prediktor yang dipilih secara acak pada node tersebut.
              Random Forest mempunyai dua buah parameter, yaitu jumlah variabel
              dalam subset acak pada setiap node dan jumlah pohon. Website ini
              bertujuan untuk memprediksi data donatur menggunakan metode random
              forest melalui perilaku donatur .
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}
