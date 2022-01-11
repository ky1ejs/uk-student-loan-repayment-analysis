import React from "react";
import Section from "../../components/Section";
import Flex from "../../components/Flex";
import RepaymentAndInvestment from "../../types/RepaymentAndInvestment";
import PrioritiseInvestmentCard from "./PrioriseInvestmentCard";
import PrioritiseRepaymentCard from "./PrioritiseRepaymentCard";
import ComparisonResultCard from "./ComparisonResultCard";
import InvestmentConfig from "../../types/InvestmentConfig";
import {
  calculateInvestment,
  calculateLoanRepayment,
  LoanConfig,
  LoanRepaymentResult,
} from "../../analysis";

interface EarlyRepaymentVsInvestmentAnalysisResultProps {
  loanRepayment: LoanRepaymentResult;
  loanConfig: LoanConfig;
  investmentConfig: InvestmentConfig;
}

const EarlyRepaymentVsInvestmentAnalysisResult = ({
  loanRepayment,
  loanConfig,
  investmentConfig,
}: EarlyRepaymentVsInvestmentAnalysisResultProps) => {
  const investment: RepaymentAndInvestment = {
    investmentPerformance: calculateInvestment(
      investmentConfig,
      loanRepayment.totalMonths
    ),
    loanRepayment,
  };

  const earlyLoanReplayment = calculateLoanRepayment({
    ...loanConfig,
    extraAnnualRepayment: investmentConfig.annualInvestment,
  });
  const repayment: RepaymentAndInvestment = {
    investmentPerformance: calculateInvestment(
      investmentConfig,
      loanRepayment.totalMonths - earlyLoanReplayment.totalMonths
    ),
    loanRepayment: earlyLoanReplayment,
  };

  return (
    <Section>
      <h2>Result</h2>
      <Flex>
        <PrioritiseInvestmentCard repaymentAndInvestment={investment} />
        <div>vs</div>
        <PrioritiseRepaymentCard repaymentAndInvestment={repayment} />
        <div>=</div>
        <ComparisonResultCard
          repaymentAndInvestment={{ investment, earlyRepayment: repayment }}
        />
      </Flex>
    </Section>
  );
};

export default EarlyRepaymentVsInvestmentAnalysisResult;
