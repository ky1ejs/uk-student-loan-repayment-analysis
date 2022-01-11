import React from "react";
import { GridRowsProp, GridColDef, DataGrid } from "@mui/x-data-grid";
import formatter from "../util/currency-formatter";
import { LoanRepaymentResult } from "../analysis";

const LoanRepaymentTable = ({
  loanRepayments,
}: {
  loanRepayments: LoanRepaymentResult;
}) => {
  const rows: GridRowsProp = loanRepayments.repayments.map((r, i) => {
    return {
      id: i + 1,
      col1: formatter.format(r.balance / 100),
      col2: formatter.format(r.totalRepayments / 100),
      col3: formatter.format(r.totalInterest / 100),
    };
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 25 },
    { field: "col1", headerName: "Balance", width: 150 },
    { field: "col2", headerName: "Repayment", width: 150 },
    { field: "col3", headerName: "Interest", width: 150 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} autoPageSize />
    </div>
  );
};

export default LoanRepaymentTable;
