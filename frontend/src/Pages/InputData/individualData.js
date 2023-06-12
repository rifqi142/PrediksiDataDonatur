import React from "react";

export const IndividualData = ({ individualExcelData }) => {
  // Format mata uang
  const formattedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(individualExcelData.jumlah_donasi);

  return (
    <>
      <th>{individualExcelData.no}</th>
      <th>{individualExcelData.tanggal}</th>
      <th>{individualExcelData.jenis_donasi}</th>
      <th>{formattedCurrency}</th>
    </>
  );
};
