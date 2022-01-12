import React from "react";
import Card from "../../components/Card";
import RepaymentAndInvestment from "../../types/RepaymentAndInvestment";
import formatPennies from "../../util/currency-formatter";

interface PrioritiseInvestmentCardProps {
  repaymentAndInvestment: RepaymentAndInvestment;
  bgColor: string;
}

const PrioritiseInvestmentCard = ({
  repaymentAndInvestment: { loanRepayment, investmentPerformance },
  bgColor,
}: PrioritiseInvestmentCardProps) => (
  <Card bgColor={bgColor} title="Prioritising Investment">
    <p>{loanRepayment.payments.length} years repaying whilst investing</p>
    <p>
      {formatPennies(loanRepayment.totalPayments)} paid to SFE (
      {formatPennies(loanRepayment.totalInterestPaid)} interest)
    </p>
    <p>
      {formatPennies(investmentPerformance.balance)} in your savings (
      {formatPennies(investmentPerformance.interestEarned)} interest)
    </p>
    {/* Your loan will take {result.repayments.length} years ({result.totalMonths} in months) to repay and will cost {formatter.format(result.totalInterest / 100)} in interest.*/}
  </Card>
);

export default PrioritiseInvestmentCard;
