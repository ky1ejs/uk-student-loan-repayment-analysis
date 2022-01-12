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
import AnnuallyOrMonthly from "../../types/AnnuallyOrMonthly";

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
    extraAnnualRepayment:
      investmentConfig.investmentFrequency === AnnuallyOrMonthly.Monthly
        ? investmentConfig.investment * 12
        : investmentConfig.investment,
  });
  const repayment: RepaymentAndInvestment = {
    investmentPerformance: calculateInvestment(
      {
        ...investmentConfig,
        investment:
          investmentConfig.investment +
          earlyLoanReplayment.monthlySalaryPayment,
      },
      loanRepayment.totalMonths - earlyLoanReplayment.totalMonths
    ),
    loanRepayment: earlyLoanReplayment,
  };

  console.log(repayment.loanRepayment);

  const comparison =
    investment.investmentPerformance.balance -
    investment.loanRepayment.totalPayments -
    (repayment.investmentPerformance.balance -
      repayment.loanRepayment.totalPayments);

  const red = "#ffd2cb";
  const green = "#87ffd0";

  return (
    <Section>
      <h2>Result</h2>
      <ComparisonResultCard comparisonResult={comparison} />
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
