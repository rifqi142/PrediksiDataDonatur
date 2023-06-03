import React from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Accordion, Table } from "react-bootstrap";
import "./proses.css";

export default function Proses() {
  return (
    <section id="proses-pages">
      <Sidebar />
      <div className="right-content">
        <Card border="info" className="mt-3 mx-3">
          <Card.Header className="card-header">Hasil Prediksi</Card.Header>
          <Card.Body>
            <Card.Text>
              Hasil prediksi data donatur menggunakan metode LSTM
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="accordion-data">
          <Accordion defaultActiveKey="0" className="mt-5 mx-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>List Data</Accordion.Header>
              <Accordion.Body>
                <Table responsive="lg">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Bulan</th>
                      <th>Prediksi</th>
                      <th>Ekspektasi</th>
                      <th>MAPE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Januari</td>
                      <td>900000</td>
                      <td>1000000</td>
                      <td>5%</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
