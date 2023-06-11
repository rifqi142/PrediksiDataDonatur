import React from "react";

export const IndividualData = ({ individualExcelData }) => {
  // Format tanggal
  const excelDateValue = individualExcelData.tanggal;
  const parsedDate = new Date((excelDateValue - 25569) * 86400 * 1000);
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear().toString().slice(-2);
  const formattedDate = `${day}-${month}-${year}`;

  // Format mata uang
  const formattedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(individualExcelData.jumlah_donasi);

  return (
    <>
      <th>{individualExcelData.no}</th>
      <th>{formattedDate}</th>
      <th>{individualExcelData.jenis_donasi}</th>
      <th>{formattedCurrency}</th>
    </>
  );
};
