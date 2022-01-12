import React from "react";
import Card from "../../components/Card";
import RepaymentAndInvestment from "../../types/RepaymentAndInvestment";
import formatPennies from "../../util/currency-formatter";

interface PrioritiseRepaymentCardProps {
  repaymentAndInvestment: RepaymentAndInvestment;
  bgColor: string;
}

const monthsOrYears = (months: number) => {
  const years = Math.floor(months / 12);
  const unit = years > 0 ? years : months;
  const unitName = years > 0 ? "year" : "month";
  return `${unit} ${unitName}${unit > 1 ? "s" : ""}`;
};

const PrioritiseRepaymentCard = ({
  repaymentAndInvestment: { loanRepayment, investmentPerformance },
  bgColor,
}: PrioritiseRepaymentCardProps) => (
  <Card bgColor={bgColor} title="Prioritising Loan Repayment">
    <p>
      {loanRepayment.payments.length} years repaying followed by{" "}
      {monthsOrYears(investmentPerformance.investmentMonths.length)} investing
    </p>
    <p>
      {formatPennies(loanRepayment.totalPayments)} paid to SFE (
      {formatPennies(loanRepayment.totalInterestPaid)} interest)
    </p>
    <p>
      {formatPennies(investmentPerformance.balance)} in your savings (
      {formatPennies(investmentPerformance.interestEarned)} interest)
    </p>
    {/* Over {roi.investmentMonths.length} months you'd make {formatter.format(roi.interestEarned / 100)} in interest with investment balance of {formatter.format(roi.balance / 100)}. */}
  </Card>
);

export default PrioritiseRepaymentCard;
