import React, { useState, useRef } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Form, Button, Accordion, Table } from "react-bootstrap";
import "./inputData.css";
import axios from "axios";
import { Data } from "./data";
import * as XLSX from "xlsx";

function InputData() {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);

  // handle file
  const fileType = ["application/vnd.ms-excel"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only csv file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      try {
        let res = await axios.post("/input-data", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setExcelData(data);
        console.log(data);
        if (res.status === 200) {
          console.log("Input Data Success");
        }
      } catch (err) {
        setExcelData(null);
        console.log(err);
      }
    }
  };
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
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="file"
                  // accept=".csv"
                  onChange={handleFile}
                  required
                ></input>
                {excelFileError && (
                  <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                    {excelFileError}
                  </div>
                )}
              </Form.Group>
              <br />
              <Button
                variant="primary"
                type="submit"
                className="btn-submit"
                onSubmit={handleSubmit}
              >
                Submit data
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="data">
          <Accordion defaultActiveKey="0" className="mt-5 mx-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="accordion-head">
                List Data
              </Accordion.Header>
              {excelData === null && <>No File Selected</>}
              {excelData !== null && (
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
                      <Data excelData={excelData} />
                    </tbody>
                  </Table>
                </Accordion.Body>
              )}
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default InputData;
