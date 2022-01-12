import React from "react";
import Section from "../../components/Section";
import RepaymentAndInvestment from "../../types/RepaymentAndInvestment";
import PrioritiseInvestmentCard from "./PrioriseInvestmentCard";
import PrioritiseRepaymentCard from "./PrioritiseRepaymentCard";
import ComparisonResultCard from "./ComparisonResult";
import InvestmentConfig from "../../types/InvestmentConfig";
import {
  calculateInvestment,
  calculateLoanRepayment,
  LoanConfig,
  LoanRepaymentResult,
} from "../../analysis";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  gap: 24px;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

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
    extraAnnualRepayment: investmentConfig.investment,
  });
  const repayment: RepaymentAndInvestment = {
    investmentPerformance: calculateInvestment(
      investmentConfig,
      loanRepayment.totalMonths - earlyLoanReplayment.totalMonths
    ),
    loanRepayment: earlyLoanReplayment,
  };

  const comparison =
    investment.investmentPerformance.interestEarned -
    investment.loanRepayment.totalInterest -
    (repayment.investmentPerformance.interestEarned -
      repayment.loanRepayment.totalInterest);

  const red = "#ffd2cb";
  const green = "#87ffd0";

  return (
    <Section>
      <h2>Result</h2>
      <ComparisonResultCard
        repaymentAndInvestment={{ investment, earlyRepayment: repayment }}
      />
      <Flex>
        {comparison > 0 ? (
          <>
            <PrioritiseInvestmentCard
              bgColor={green}
              repaymentAndInvestment={investment}
            />
            <PrioritiseRepaymentCard
              bgColor={red}
              repaymentAndInvestment={repayment}
            />
          </>
        ) : (
          <>
            <PrioritiseRepaymentCard
              bgColor={green}
              repaymentAndInvestment={repayment}
            />
            <PrioritiseInvestmentCard
              bgColor={red}
              repaymentAndInvestment={investment}
            />
          </>
        )}
      </Flex>
    </Section>
  );
};

export default EarlyRepaymentVsInvestmentAnalysisResult;
