import React from "react";
import { LoanConfig, LoanRepaymentResult } from "../../analysis";
import InvestmentConfig from "../../types/InvestmentConfig";
import InvestmentInput from "./InvestmentInput";
import EarlyRepaymentVsInvestmentAnalysisResult from "./EarlyRepaymentVsInvestmentAnalysisResult";
import Section from "../../components/Section";

const CompareEarlyRepaymentWithInvestment = ({
  loanRepayment,
  loanConfig,
}: {
  loanRepayment: LoanRepaymentResult;
  loanConfig: LoanConfig;
}) => {
  const [investmentConfig, setInvestmentConfig] = React.useState<
    InvestmentConfig | undefined
  >(undefined);

  return (
    <>
      <Section>
        Enter how much you can afford to repay each year/month and an interst
        rate you think you could likely attain in saving/investing and we'll
        calculate whether it would be better to invest your money or to make
        extra repayments to your loan.
      </Section>
      <InvestmentInput didUpdateInvestmentConfig={setInvestmentConfig} />

      {investmentConfig ? (
        <EarlyRepaymentVsInvestmentAnalysisResult
          loanRepayment={loanRepayment}
          loanConfig={loanConfig}
          investmentConfig={investmentConfig}
        />
      ) : (
        <>Please input your investment plans.</>
      )}
    </>
  );
};

export default CompareEarlyRepaymentWithInvestment;

// const rows: GridRowsProp = result.repayments.map((r, i) => {
//   return {
//     id: i + 1,
//     col1: formatter.format(r.balance / 100),
//     col2: formatter.format(r.totalRepayments / 100),
//     col3: formatter.format(r.totalInterest / 100),
//   };
// });

// const columns: GridColDef[] = [
//   { field: "id", headerName: "#", width: 25 },
//   { field: "col1", headerName: "Balance", width: 150 },
//   { field: "col2", headerName: "Repayment", width: 150 },
//   { field: "col3", headerName: "Interest", width: 150 },
// ];

// const rows2: GridRowsProp = compareResult.repayments.map((r, i) => {
//   return {
//     id: i + 1,
//     col1: formatter.format(r.balance / 100),
//     col2: formatter.format(r.totalRepayments / 100),
//     col3: formatter.format(r.totalInterest / 100),
//     col4: formatter.format(extraAnnualRepayment / 100),
//   };
// });

// const columns2: GridColDef[] = [
//   { field: "id", headerName: "#", width: 25 },
//   { field: "col1", headerName: "Balance", width: 100 },
//   { field: "col2", headerName: "Repayment", width: 100 },
//   { field: "col3", headerName: "Interest", width: 100 },
//   { field: "col4", headerName: "Extra Repayment", width: 100 },
// ];

// const row3: GridRowsProp = roi
//   ? roi.investmentMonths.map((r, i) => {
//       return {
//         id: i + 1,
//         col1: formatter.format(r.balance / 100),
//         col2: formatter.format(r.interstThisMonth / 100),
//         col3: formatter.format(r.ytdInterestEarned / 100),
//         col4: formatter.format(r.ytdInvested / 100),
//       };
//     })
//   : [];

// const columns3: GridColDef[] = [
//   { field: "id", headerName: "#", width: 25 },
//   { field: "col1", headerName: "Balance", width: 100 },
//   { field: "col2", headerName: "Interest", width: 100 },
//   { field: "col3", headerName: "YTD Interest", width: 100 },
//   { field: "col4", headerName: "TTD Invested", width: 100 },
// ];

// <Section>
//           <Flex>
//             <div style={{ height: 450, width: "100%" }}>
//               <DataGrid rows={row3} columns={columns3} autoPageSize />
//             </div>
//             <div style={{ height: 450, width: "100%" }}>
//               <DataGrid rows={rows2} columns={columns2} autoPageSize />
//             </div>
//           </Flex>
//         </Section>
//         <Section>
//           <Flex>
//             <div style={{ height: 450, width: "100%" }}>
//               <DataGrid rows={rows} columns={columns} autoPageSize />
//             </div>
//           </Flex>
//         </Section>
