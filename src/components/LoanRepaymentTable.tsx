import React from "react";
import { GridRowsProp, GridColDef, DataGrid } from "@mui/x-data-grid";
import formatPennies from "../util/currency-formatter";
import { LoanRepaymentResult } from "../analysis";

const LoanRepaymentTable = ({
  loanRepayments,
}: {
  loanRepayments: LoanRepaymentResult;
}) => {
  const rows: GridRowsProp = loanRepayments.payments.map((r, i) => {
    return {
      id: i + 1,
      col1: formatPennies(r.balance),
      col2: formatPennies(r.totalPayments),
      col3: formatPennies(r.totalInterest),
      col4: formatPennies(r.totalInterestToDate),
    };
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Year", width: 70 },
    { field: "col1", headerName: "Balance", width: 120 },
    { field: "col2", headerName: "Repayment", width: 120 },
    { field: "col3", headerName: "Interest", width: 120 },
    { field: "col4", headerName: "Interest (YTD)", width: 140 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} autoPageSize />
    </div>
  );
};

export default LoanRepaymentTable;
