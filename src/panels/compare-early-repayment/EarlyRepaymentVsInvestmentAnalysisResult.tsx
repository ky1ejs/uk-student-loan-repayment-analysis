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
import InvestmentConfigInput from "../../types/InvestmentInput";
import { stringToPennies } from "../../util/parse-pound";
import { stringToPercentage } from "../../util/parse-percentage";
import ResultsPlaceholder from "./ResultsPlaceholder";

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
  investmentConfigInput: InvestmentConfigInput;
}

const EarlyRepaymentVsInvestmentAnalysisResult = ({
  loanRepayment,
  loanConfig,
  investmentConfigInput,
}: EarlyRepaymentVsInvestmentAnalysisResultProps) => {
  const investmentAmount = stringToPennies(investmentConfigInput.investment);
  const expectedAnnualReturn = stringToPercentage(
    investmentConfigInput.expectedAnnualReturn
  );

  let investmentConfig: InvestmentConfig | undefined = undefined;
  if (investmentAmount && expectedAnnualReturn) {
    investmentConfig = {
      investment: investmentAmount,
      expectedAnnualReturn,
      investmentFrequency: investmentConfigInput.investmentFrequency,
    };
  } else {
    return <ResultsPlaceholder />;
  }

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
        investment: investmentConfigInput.investLoanPayments
          ? investmentConfig.investment +
            earlyLoanReplayment.monthlySalaryPayment
          : investmentConfig.investment,
      },
      loanRepayment.totalMonths - earlyLoanReplayment.totalMonths
    ),
    loanRepayment: earlyLoanReplayment,
  };

  console.log(repayment.loanRepayment);

  const comparison =
    investment.investmentPerformance.balance -
    repayment.investmentPerformance.balance;

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
