import React from "react";
import { RecentData } from "./recentData";

export default function Data({ showRecentData }) {
  return (
    <>
      {showRecentData.map((recentData) => (
        <RecentData recentData={recentData} key={recentData.id} />
      ))}
    </>
  );
}
