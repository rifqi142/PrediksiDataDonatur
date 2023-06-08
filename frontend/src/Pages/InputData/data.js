import React from "react";
import { IndividualData } from "./individualData";

export const Data = ({ excelData }) => {
  return excelData.map((individualExcelData) => (
    <tr key={individualExcelData.Id}>
      <IndividualData individualExcelData={individualExcelData} />
    </tr>
  ));
};
