import React from "react";
import { IndividualData } from "./IndividualData";

export const Data = ({ excelData }) => {
  return excelData.map((individualExcelData, index) => (
    <tr key={index}>
      <IndividualData individualExcelData={individualExcelData} />
    </tr>
  ));
};
