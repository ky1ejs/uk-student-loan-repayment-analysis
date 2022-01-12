import React from "react";
import Bold from "../../components/Bold";
import RepaymentAndInvestment from "../../types/RepaymentAndInvestment";
import formatter from "../../util/currency-formatter";

interface ComparisonResultCardProps {
  investment: RepaymentAndInvestment;
  earlyRepayment: RepaymentAndInvestment;
}

const ComparisonResult = ({
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
    <p>
      {comparison > 0 ? (
        <>
          Focus on Investment! You'll be{" "}
          <Bold>{formatter.format(comparison / 100)} better off</Bold>.
        </>
      ) : (
        <>
          Repay Early! You'll be{" "}
          <Bold>{formatter.format(Math.abs(comparison / 100))} better off</Bold>
          .
        </>
      )}
    </p>
  );
};

export default ComparisonResult;
