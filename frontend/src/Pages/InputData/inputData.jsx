import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Form, Button, Accordion, Table } from "react-bootstrap";
import "./inputData.css";
import axios from "axios";
import * as XLSX from "xlsx";

function InputData() {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [judul, setJudul] = useState("");
  const [data, setData] = useState([]);

  const userJudul = useRef();
  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/get-new-data`);
        console.log(res.data.data);
        setData(res.data.data); // Assuming the fetched data is an array and stored in 'data'
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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

      console.log(data);
      setExcelData(data);

      try {
        const form = document.getElementById("form");
        const formData = new FormData(form);
        formData.append("judul", judul);
        formData.append("file", data);

        const response = await axios.post("/input-data", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setJudul("");
        console.log(response.data);
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Judul Dataset</Form.Label>
                <input
                  placeholder="Masukan Judul Dataset"
                  type="text"
                  className="form-control"
                  id="judul"
                  name="judul"
                  ref={userJudul}
                  onChange={(e) => setJudul(e.target.value)}
                  value={judul}
                  required
                />
              </Form.Group>
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
              {data === null && <>No File Selected</>}
              {data !== null && (
                <Accordion.Body>
                  <Table responsive="sm" id="table" className="table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Tahun</th>
                        <th>Bulan</th>
                        <th>Jenis Donasi</th>
                        <th>Jumlah Donasi</th>
                        <th>Jumlah Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.tahun}</td>
                          <td>{item.bulan}</td>
                          <td>{item.jenis_donasi}</td>
                          <td>{item.jumlah_donasi}</td>
                          <td>{item.jumlah_data}</td>
                        </tr>
                      ))}
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
