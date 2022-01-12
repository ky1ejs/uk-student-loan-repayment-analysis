import React from "react";
import Card from "../../components/Card";
import RepaymentAndInvestment from "../../types/RepaymentAndInvestment";
import formatter from "../../util/currency-formatter";

interface PrioritiseInvestmentCardProps {
  repaymentAndInvestment: RepaymentAndInvestment;
  bgColor: string;
}

const PrioritiseInvestmentCard = ({
  repaymentAndInvestment: { loanRepayment, investmentPerformance },
  bgColor,
}: PrioritiseInvestmentCardProps) => (
  <Card bgColor={bgColor} title="Prioritising Investment">
    <p>{loanRepayment.repayments.length} years repaying &amp; investing</p>
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
    {/* Your loan will take {result.repayments.length} years ({result.totalMonths} in months) to repay and will cost {formatter.format(result.totalInterest / 100)} in interest.*/}
  </Card>
);

export default PrioritiseInvestmentCard;
