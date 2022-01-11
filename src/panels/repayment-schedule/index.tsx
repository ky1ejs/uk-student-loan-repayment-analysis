import React from "react";
import { LoanRepaymentResult } from "../../analysis";
import Bold from "../../components/Bold";
import formatter from "../../util/currency-formatter";
import LoanRepaymentTable from "../../components/LoanRepaymentTable";

const RepaymentSchedule = ({
  repayment,
}: {
  repayment: LoanRepaymentResult;
}) => (
  <>
    <h2>Summary</h2>
    <p>
      You'll pay your Student Loan off in{" "}
      <Bold>
        {repayment.repayments.length} year
        {repayment.repayments.length > 1 ? "s" : ""}
      </Bold>
      . You'll pay a total of{" "}
      <Bold>{formatter.format(repayment.totalInterest / 100)} in interest</Bold>
      .
    </p>

    <h2>Breakdown</h2>
    <LoanRepaymentTable loanRepayments={repayment} />
  </>
);

export default RepaymentSchedule;
