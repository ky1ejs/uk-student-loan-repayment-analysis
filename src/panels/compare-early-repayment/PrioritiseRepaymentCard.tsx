import React from "react";
import Card from "../../components/Card";
import RepaymentAndInvestment from "../../types/RepaymentAndInvestment";
import formatter from "../../util/currency-formatter";

const PrioritiseRepaymentCard = ({
  repaymentAndInvestment: { loanRepayment, investmentPerformance },
}: {
  repaymentAndInvestment: RepaymentAndInvestment;
}) => (
  <Card title="Prioritise Loan Repayment">
    <p>
      {loanRepayment.repayments.length} years repaying, then{" "}
      {Math.floor(investmentPerformance.investmentMonths.length / 12)} years
      investing
    </p>
    <p>
      {formatter.format(loanRepayment.totalInterest / 100)} loan interest cost
    </p>
    <p>
      {formatter.format(investmentPerformance.interestEarned / 100)} investment
      interest earned
    </p>
    <p>
      {formatter.format(
        (investmentPerformance.interestEarned - loanRepayment.totalInterest) /
          100
      )}{" "}
      balance
    </p>
    {/* Over {roi.investmentMonths.length} months you'd make {formatter.format(roi.interestEarned / 100)} in interest with investment balance of {formatter.format(roi.balance / 100)}. */}
  </Card>
);

export default PrioritiseRepaymentCard;
