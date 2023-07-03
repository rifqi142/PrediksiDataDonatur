import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import axios from "axios";
import { Card, Button, Row, Col, Modal, Table } from "react-bootstrap";
import "./history.css";

export default function History() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [dataHasil, setDataHasil] = useState([]);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  // Detail Modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const handleCloseDetailModal = () => setShowDetailModal(false);
  const handleShowDetailModal = () => setShowDetailModal(true);

  // Hasil Modal
  const [showHasilModal, setShowHasilModal] = useState(false);
  const handleCloseHasilModal = () => setShowHasilModal(false);
  const handleShowHasilModal = () => setShowHasilModal(true);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  // Fetch data master
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/get-data-master`);
        console.log(res.data.data);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // Mengambil data dari dataset dengan id master terakhir
  useEffect(() => {
    async function fetchNewData() {
      try {
        const res = await axios.get(`/get-new-data/${selectedId}`);
        console.log(res.data.data);
        setNewData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchNewData();
  }, [selectedId]);

  // Mengambil data dari hasil prediksi dengan id master terakhir
  useEffect(() => {
    async function fetchHasilPrediksi() {
      try {
        const res = await axios.get(`/get-data-predict/${selectedId}`);
        console.log(res.data.data);
        setDataHasil(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchHasilPrediksi();
  }, [selectedId]);

  // Delete data berdasarkan id master
  const handleConfirmDelete = async () => {
    try {
      const res = await axios.delete(`/delete-data/${selectedId}`);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }

    // Close the delete modal
    handleCloseDeleteModal();
  };

  const handleCancelDelete = () => {
    handleCloseDeleteModal();
  };

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
              Riwayat pemrosesan data donatur menggunakan metode Random Forest
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
              <Col key={master.id} xs={6}>
                <Card>
                  <Card.Body>
                    <Card.Title className="judul-data">
                      {master.judul}
                    </Card.Title>
                    <Card.Text>
                      {master.nama_dataset}
                      <br />
                      {master.id !== null ? (
                        <>
                          <Button
                            variant="primary"
                            className="mt-2"
                            onClick={() => {
                              setSelectedId(master.id);
                              setSelectedData(master);
                              handleShowDetailModal();
                            }}
                          >
                            Lihat Detail Data
                          </Button>
                          <Modal
                            show={showDetailModal}
                            onHide={handleCloseDetailModal}
                            size="xl"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Lihat data {selectedData && selectedData.judul}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modal-body-scroll">
                              <Table
                                responsive="sm"
                                id="table"
                                className="table"
                              >
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
                                  {newData.map((item, index) => (
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
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleCloseDetailModal}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                      ) : (
                        <p></p>
                      )}
                      {master.hasil === 0 ? (
                        <p></p>
                      ) : (
                        <>
                          <Button
                            variant="success"
                            className="mt-2 ms-2"
                            onClick={() => {
                              setSelectedId(master.id);
                              handleShowHasilModal();
                            }}
                          >
                            Lihat Hasil
                          </Button>
                          <Modal
                            show={showHasilModal}
                            onHide={handleCloseHasilModal}
                            size="xl"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Hasil Prediksi</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modal-body-scroll">
                              <Table
                                responsive="sm"
                                id="table"
                                className="table"
                              >
                                <thead>
                                  <tr>
                                    <th>No.</th>
                                    <th>Tahun</th>
                                    <th>Bulan</th>
                                    <th>Jenis Donasi</th>
                                    <th>Jenis Prediksi</th>
                                    <th>Hasil Prediksi</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dataHasil.map((item, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item.tahun}</td>
                                      <td>{item.bulan}</td>
                                      <td>{item.jenis_donasi}</td>
                                      <td>{item.jenis_prediksi}</td>
                                      <td>{item.hasil_prediksi}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleCloseHasilModal}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                      )}
                      <>
                        <Button
                          variant="danger"
                          className="mt-2 ms-2"
                          onClick={() => {
                            setSelectedId(master.id);
                            handleShowDeleteModal();
                          }}
                        >
                          Delete
                        </Button>
                        <Modal
                          show={showDeleteModal}
                          onHide={handleCloseDeleteModal}
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to delete the data?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCancelDelete}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="danger"
                              onClick={handleConfirmDelete}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
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
