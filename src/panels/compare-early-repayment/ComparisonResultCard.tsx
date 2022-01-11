import React from "react";
import Card from "../../components/Card";
import RepaymentAndInvestment from "../../types/RepaymentAndInvestment";
import formatter from "../../util/currency-formatter";

interface ComparisonResultCardProps {
  investment: RepaymentAndInvestment;
  earlyRepayment: RepaymentAndInvestment;
}

const ComparisonResultCard = ({
  repaymentAndInvestment: { investment, earlyRepayment },
}: {
  repaymentAndInvestment: ComparisonResultCardProps;
}) => {
  const comparison =
    investment.investmentPerformance.interestEarned -
    investment.loanRepayment.totalInterest -
    (earlyRepayment.investmentPerformance.interestEarned -
      earlyRepayment.loanRepayment.totalInterest);
  return (
    <Card title="Result">
      {comparison > 0 ? (
        <>
          <p>Focus on Investment!</p>
          You'll be {formatter.format(comparison / 100)} better off.
        </>
      ) : (
        <>
          <p>Repay Early!</p>
          You'll be {formatter.format(Math.abs(comparison / 100))} better off.
        </>
      )}
      {/* If you used the your investment money you'd repay your loan in {compareResult.repayments.length} years ({result.repayments.length - compareResult.repayments.length} years early), saving {formatter.format((result.totalInterest - compareResult.totalInterest) / 100)} in interest. */}
    </Card>
  );
};

export default ComparisonResultCard;
