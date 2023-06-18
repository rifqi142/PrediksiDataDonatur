import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./history.css";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/get-data-master`);
        console.log(res.data.data);
        setData(res.data.data); // Assuming the fetched data is an array and stored in 'data'
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <section id="history-pages">
      <div className="left-content">
        <Sidebar />
      </div>
      <div className="right-content">
        <Card border="info" className="mt-3 mx-3">
          <Card.Header className="card-header">
            Riwayat Pemrosesan Data
          </Card.Header>
          <Card.Body>
            <Card.Text>
              Riwayat pemrosesan data donatur menggunakan metode LSTM
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        {data.length === 0 ? (
          <Card>
            <Card.Body>
              <Card.Text>
                <h3>Tidak ada riwayat data pemrosesan.</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <Row className="data-history">
            {data.map((master) => (
              <Col key={master.id} xs={5}>
                <Card>
                  <Card.Body>
                    <Card.Title className="judul-data">
                      {master.judul}
                    </Card.Title>
                    <Card.Text>
                      {master.nama_dataset}
                      <br />
                      {master.id !== null ? (
                        <Button variant="primary" className="mt-2">
                          Lihat Detail Data
                        </Button>
                      ) : (
                        <p></p>
                      )}
                      {master.hasil === 1 ? (
                        <p></p>
                      ) : (
                        <Button variant="success" className="mt-2 ms-2">
                          Lihat Hasil
                        </Button>
                      )}
                      <Button variant="danger" className="mt-2 ms-2">
                        Delete
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </section>
  );
}
