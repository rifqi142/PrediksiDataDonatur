import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar/sidebar";
import { Card } from "react-bootstrap";
import { registerables } from "chart.js";
import Chart from "chart.js/auto";
import "./grafik.css";
import axios from "axios";

export default function Grafik() {
  const [chartData, setChartData] = useState({});

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

    // const monthNames = [
    //   "Januari",
    //   "Februari",
    //   "Maret",
    //   "April",
    //   "Mei",
    //   "Juni",
    //   "Juli",
    //   "Agustus",
    //   "September",
    //   "Oktober",
    //   "November",
    //   "Desember",
    // ];

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

  return (
    <>
      <section id="grafik-pages">
        <Sidebar />
        <div className="right-content">
          <Card border="info">
            <Card.Header>
              Lihat Grafik dari Model yang sudah diproses
            </Card.Header>
          </Card>

          <div className="chart">
            <canvas id="myChart" width="800" height="400"></canvas>
            {/* <canvas id="myChart2"></canvas> */}
          </div>
        </div>
      </section>
    </>
  );
}
