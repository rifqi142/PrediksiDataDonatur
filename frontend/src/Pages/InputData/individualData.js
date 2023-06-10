import React from "react";

export const IndividualData = ({ individualExcelData }) => {
  // Parse the date
  const parsedDate = new Date(individualExcelData.tanggal);

  // Format the date as desired
  const formattedDate = `${parsedDate.getDate()}/${
    parsedDate.getMonth() + 1
  }/${parsedDate.getFullYear()}`;

  return (
    <>
      <th>{individualExcelData.no}</th>
      <th>{formattedDate}</th>
      <th>{individualExcelData.jenis_donasi}</th>
      <th>{individualExcelData.jumlah_donasi}</th>
    </>
  );
};
