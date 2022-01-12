import React from "react";
import { LoanRepaymentResult } from "../../analysis";
import Bold from "../../components/Bold";
import formatPennies from "../../util/currency-formatter";
import LoanRepaymentTable from "../../components/LoanRepaymentTable";

const RepaymentSchedule = ({
  repayment,
}: {
  repayment: LoanRepaymentResult;
}) => (
  <>
    <h2>Summary</h2>
    <p>
      {repayment.incomeBelowThreshold ? (
        <>At this salary, loan payments will never be taken from you</>
      ) : (
        <>
          {repayment.writtenOff ? (
            <>
              <p>
                You'll pay your Student Loan for{" "}
                <Bold>
                  {repayment.payments.length} year
                  {repayment.payments.length > 1 ? "s" : ""}
                </Bold>{" "}
                and then it will be written off.
              </p>
              <p>
                In that time you'll{" "}
                <Bold>
                  pay a total of {formatPennies(repayment.totalPayments)}
                </Bold>
                , with {formatPennies(repayment.totalInterestPaid)} of that
                being interest.
              </p>
              <p>
                {formatPennies(repayment.amountWrittenOff)} will be written off.
              </p>
            </>
          ) : (
            <>
              You'll pay your Student Loan off for{" "}
              <Bold>
                {repayment.payments.length} year
                {repayment.payments.length > 1 ? "s" : ""}
              </Bold>{" "}
              costing you a a total of{" "}
              <Bold>
                {formatPennies(repayment.totalInterestPaid)} in interest
              </Bold>
              .
            </>
          )}
        </>
      )}
    </p>

    <h2>Breakdown</h2>
    <LoanRepaymentTable loanRepayments={repayment} />
  </>
);

export default RepaymentSchedule;
