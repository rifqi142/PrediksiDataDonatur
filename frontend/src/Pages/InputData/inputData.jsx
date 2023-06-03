import React from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Container, Form, Button } from "react-bootstrap";
import "./inputData.css";

function InputData() {
  return (
    <section id="inputData-pages">
      <Sidebar />
      {/* <Container > */}
      <Card style={{ width: "90rem" }} className="card-content">
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
      {/* </Container> */}
    </section>
  );
}

export default InputData;
