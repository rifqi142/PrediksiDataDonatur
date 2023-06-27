import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./proses.css";

export default function Proses() {
  const selectRef = useRef();

  const [data, setData] = useState([]);

  const handlePredict = async (e) => {
    e.preventDefault();
    const selectedValue = selectRef.current.value;
    try {
      const res = await axios.post(`/proses-predict/${selectedValue}`);
      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="proses-pages">
      <Sidebar />
      <div className="right-content">
        <Card border="info" className="mt-3 mx-3">
          <Card.Header className="card-header">Hasil Prediksi</Card.Header>
          <Card.Body>
            <Card.Text>
              Hasil prediksi data donatur menggunakan metode Random Forest
              Regression
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="prediction mt-3 mx-3">
          <Card>
            <Card.Body>
              <Card.Text>Pilih data yang ingin di prediksi</Card.Text>
              <Form.Select ref={selectRef}>
                <option>Pilih Data</option>
                <option value="1">Jumlah Donasi</option>
                <option value="2">Jumlah Data</option>
              </Form.Select>
              <Button
                variant="primary"
                className="btn-predict mt-3"
                onClick={handlePredict}
              >
                Prediksi
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </section>
  );
}
