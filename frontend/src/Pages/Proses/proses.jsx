import React, { useState } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./proses.css";

export default function Proses() {
  const [selectedValue, setSelectedValue] = useState("");

  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedValue);
    try {
      const res = await axios.post(
        `/proses-predict`,
        { pilihan: selectedValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data.data);
      setData(res.data.data);
      if (res.status === 200) {
        console.log("Data successfully submitted", res.data);
      }
    } catch (error) {
      console.log(error);
      console.log(data);
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
              <Form>
                <Form.Select value={selectedValue} onChange={handleChange}>
                  <option>Pilih Data</option>
                  <option value="1">Jumlah Donasi</option>
                  <option value="2">Jumlah Data</option>
                </Form.Select>
              </Form>
              <Button
                variant="primary"
                className="btn-predict mt-3"
                onClick={handleSubmit}
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
