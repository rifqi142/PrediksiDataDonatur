import React from "react";

export const Data = ({ excelData }) => {
  // Format mata uang ke rupiah
  const formattedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <>
      {excelData.map((individualExcelData, index) => (
        <tr key={index}>
          <th>{index + 1}</th>
          <th>{individualExcelData.tahun}</th>
          <th>{individualExcelData.bulan}</th>
          <th>{individualExcelData.jenis_donasi}</th>
          <th>{individualExcelData.jumlah_donasi}</th>
          {/* <th>{formattedCurrency.format(individualExcelData.jumlah_donasi)}</th> */}
          <th>{individualExcelData.jumlah_data}</th>
        </tr>
      ))}
    </>
  );
};
