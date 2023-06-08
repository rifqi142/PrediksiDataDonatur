import React from "react";

export const IndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData.no}</th>
      <th>{individualExcelData.tanggal}</th>
      <th>{individualExcelData.jenis_donasi}</th>
      <th>{individualExcelData.jumlah_donasi}</th>
    </>
  );
};
