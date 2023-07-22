import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card, Accordion, Table } from "react-bootstrap";
import { registerables } from "chart.js";
import Chart from "chart.js/auto";
import "./grafik.css";
import axios from "axios";

export default function Grafik() {
  const [chartData, setChartData] = useState({});
  const [chartData2, setChartData2] = useState({});

  // chart 1
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/get-chart-donasi");
        setChartData(res.data);
        createChart(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const data_count = 84;
  const labels = [];
  for (let i = 0; i < data_count; i++) {
    labels.push(i);
  }

  const createChart = (data) => {
    const ctx = document.getElementById("myChart").getContext("2d");

    // Hancurkan chart sebelumnya (jika ada)
    const previousChart = Chart.getChart("myChart");
    if (previousChart) {
      previousChart.destroy();
    }

    Chart.register(...registerables);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Data Aktual",
            data: data.expectations,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Data Prediksi",
            data: data.predictions,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Perbandingan Jumlah Donasi",
          },
        },
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Jumlah Donasi",
            },
            ticks: {
              beginAtZero: true,
            },
            suggestedMax: Math.max(...data.expectations, ...data.predictions),
          },
        },
      },
    });
  };

  // chart 2
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/get-chart-data");
        setChartData2(res.data);
        createChart2(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const createChart2 = (data) => {
    const ctx = document.getElementById("myChart2").getContext("2d");

    // Hancurkan chart sebelumnya (jika ada)
    const previousChart = Chart.getChart("myChart2");
    if (previousChart) {
      previousChart.destroy();
    }

    Chart.register(...registerables);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Data Aktual",
            data: data.expectations,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Data Prediksi",
            data: data.predictions,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Perbandingan Jumlah Data",
          },
        },
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Jumlah Data",
            },
            ticks: {
              beginAtZero: true,
            },
            suggestedMax: Math.max(...data.expectations, ...data.predictions),
          },
        },
      },
    });
  };
  return (
    <>
      <section id="grafik-pages">
        <Sidebar />
        <div className="right-content">
          <Card border="info">
            <Card.Header>
              Lihat Grafik dari Data yang sudah diproses
            </Card.Header>
          </Card>

          <div className="chart">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Lihat Grafik Perbandingan Jumlah Donasi
                </Accordion.Header>
                <Accordion.Body>
                  <canvas id="myChart" width="800" height="400"></canvas>
                </Accordion.Body>
                <Accordion.Body>
                  <Table responsive="sm" id="table" className="table">
                    <thead>
                      <tr>
                        <th>MAE</th>
                        <th>MSE</th>
                        <th>MAPE</th>
                        <th>RMSE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2377147764.88</td>
                        <td>29403585</td>
                        <td>5,4222</td>
                        <td>63.63%</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Lihat Grafik Perbandingan Jumlah Data
                </Accordion.Header>
                <Accordion.Body>
                  <canvas id="myChart2" width="800" height="400"></canvas>
                </Accordion.Body>
                <Accordion.Body>
                  <Table responsive="sm" id="table" className="table">
                    <thead>
                      <tr>
                        <th>MAE</th>
                        <th>MSE</th>
                        <th>MAPE</th>
                        <th>RMSE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2528.55</td>
                        <td>19217924.51</td>
                        <td>4,384</td>
                        <td>31.33%</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
