import React, { useState, useRef } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./proses.css";

export default function Proses() {
  const userTahun = useRef();
  const userBulan = useRef();
  const userJenis = useRef();

  const [tahun, setTahun] = useState("");
  const [bulan, setBulan] = useState("");
  const [jenis, setJenis] = useState("");
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
        {
          tahun: tahun,
          bulan: bulan,
          jenis: jenis,
          pilihan: selectedValue,
        },
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
          <Card.Header className="card-header">
            Proses Data Menggunakan Metode Random Forest
          </Card.Header>
          <Card.Body>
            <Card.Text>
              Proses data menggunakan Metode Random Forest, Silahkan lengkapi
              form dibawah ini :
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="prediction mt-3 mx-3">
          <Card>
            <Card.Body>
              <Card.Text>
                Lengkapi form dibawah ini untuk melakukan prediksi :
              </Card.Text>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicTahun">
                  <Form.Label>Masukan Tahun</Form.Label>
                  <input
                    placeholder="Masukan Tahun ex: 2021"
                    type="number"
                    className="form-control"
                    id="tahun"
                    name="tahun"
                    ref={userTahun}
                    onChange={(e) => setTahun(e.target.value)}
                    value={tahun}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicBulan">
                  <Form.Label>Masukan Bulan</Form.Label>
                  <input
                    placeholder="Masukan Bulan ex: 1"
                    type="number"
                    className="form-control"
                    id="bulan"
                    name="bulan"
                    ref={userBulan}
                    onChange={(e) => setBulan(e.target.value)}
                    value={bulan}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicJenis">
                  <Form.Label>Masukan Jenis Donasi</Form.Label>
                  <input
                    placeholder="Masukan Bulan ex: ZAKAT"
                    type="text"
                    className="form-control"
                    id="jenis"
                    name="jenis"
                    ref={userJenis}
                    onChange={(e) => setJenis(e.target.value)}
                    value={jenis}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Pilih yang ingin di prediksi</Form.Label>
                  <Form.Select value={selectedValue} onChange={handleChange}>
                    <option>Pilih Data</option>
                    <option value="1">Jumlah Donasi</option>
                    <option value="2">Jumlah Data</option>
                  </Form.Select>
                </Form.Group>
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
