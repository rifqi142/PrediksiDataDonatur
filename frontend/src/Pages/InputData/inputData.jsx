import React from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Form, Button, Accordion, Table } from "react-bootstrap";
import "./inputData.css";

function InputData() {
  return (
    <section id="inputData-pages">
      <Sidebar />
      <div className="right-content">
        <Card border="info" className="mt-3 mx-3">
          <Card.Header className="card-header">Memasukan Data</Card.Header>
          <Card.Body>
            <Card.Text>
              Memasukan file data donatur untuk dilakukan prediksi
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <Card className="card-content">
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicData">
                <h3>Input Data Donatur</h3>
                <Form.Label>
                  Silahkan input data time series pada form berikut:
                </Form.Label>
                <Form.Control type="file" id="formFile" name="file" />
                <small class="text-danger">
                  hanya mendukung file tipe .csv dan .xlsx
                </small>
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" className="btn-submit">
                Submit data
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Accordion defaultActiveKey="0" className="mt-5 mx-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="accordion-head">
              List Data
            </Accordion.Header>
            <Accordion.Body>
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Bulan</th>
                    <th>Jenis Donasi</th>
                    <th>Jumlah Donasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Januari</td>
                    <td>Zakat</td>
                    <td>1000000</td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </section>
  );
}

export default InputData;
