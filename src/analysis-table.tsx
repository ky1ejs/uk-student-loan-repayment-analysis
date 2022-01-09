import React, { useEffect, useState } from "react";
import { analyse, Config } from "./analysis";

const AnalysisTable = ({config}: {config?: Config}) => {
  if (!config) return null;

  const result = analyse(config)
  return (
    <>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Remaining</th>
          <th>Repayed</th>
          <th>Interest</th>
        </tr>
      </thead>
      <tbody>
        {result.repayments.map((r, i) => (
          <tr>
            <td>{i + 1}</td>
            <td>{r.balance / 100}</td>
            <td>{r.totalRepayments / 100}</td>
            <td>{r.totalInterest / 100}</td>
          </tr>
        ))}
      </tbody>
    </table>
    Total interest: {result.totalInterest / 100}
    </>
  )
}

export default AnalysisTable;