import React, { useState } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Form, Button, Accordion, Table } from "react-bootstrap";
import "./inputData.css";
import axios from "axios";
import { Data } from "./Data";
import * as XLSX from "xlsx";

function InputData() {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      // date formatting
      const newData = data.map((item) => {
        const excelDateValue = item.tanggal;
        let formattedDate = "";
        if (!isNaN(excelDateValue)) {
          const dateNumber = parseFloat(excelDateValue);
          const excelEpoch = new Date(Date.UTC(1899, 11, 30));
          const millisecondsPerDay = 24 * 60 * 60 * 1000;
          const excelDate =
            excelEpoch.getTime() + dateNumber * millisecondsPerDay;
          const date = new Date(excelDate);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          formattedDate = `${year}-${month}-${day}`;
        } else {
          // Jika item.tanggal adalah string biasa, misalnya "2023-06-12"
          const dateParts = item.tanggal.split("-"); // Pisahkan tahun, bulan, dan hari
          const year = dateParts[0];
          const month = dateParts[1];
          const day = dateParts[2];
          formattedDate = `${year}-${month}-${day}`;
        }
        console.log(typeof item.tanggal, formattedDate);
        return { ...item, tanggal: formattedDate };
      });
      console.log(newData);
      setExcelData(newData);

      try {
        const form = document.getElementById("form");
        const formData = new FormData(form);
        formData.append("file", newData);
        const response = await axios.post("/input-data", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        if (response.status === 200) {
          console.log("Data successfully submitted", response.data);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        console.log(data);
      }
    } else {
      setExcelData(null);
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
            <Form id="form" onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicData">
                <h3>Input Data Donatur</h3>
                <Form.Label>
                  Silahkan input data time series pada form berikut:
                </Form.Label>
                <input
                  name="file"
                  className="form-control"
                  type="file"
                  id="file"
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
              <Button variant="primary" type="submit" className="btn-submit">
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
                  <Table responsive="sm" id="table" className="table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Tanggal</th>
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
