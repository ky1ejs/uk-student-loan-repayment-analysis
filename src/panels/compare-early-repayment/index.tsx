import React from "react";
import { LoanConfig, LoanRepaymentResult } from "../../analysis";
import InvestmentConfig from "../../types/InvestmentConfig";
import InvestmentInput from "./InvestmentInput";
import EarlyRepaymentVsInvestmentAnalysisResult from "./EarlyRepaymentVsInvestmentAnalysisResult";
import Section from "../../components/Section";
import ResultsPlaceholder from "./ResultsPlaceholder";

const CompareEarlyRepaymentWithInvestment = ({
  loanRepayment,
  loanConfig,
  investmentConfig,
  setInvestmentConfig,
}: {
  loanRepayment: LoanRepaymentResult;
  loanConfig: LoanConfig;
  investmentConfig?: InvestmentConfig;
  setInvestmentConfig: (c?: InvestmentConfig) => void;
}) => (
  <>
    <Section>
      Enter how much you can afford to repay each year/month and an interst rate
      you think you could likely attain in saving/investing and we'll calculate
      whether it would be better to invest your money or to make extra
      repayments to your loan.
    </Section>
    <InvestmentInput
      didUpdateInvestmentConfig={setInvestmentConfig}
      initialValues={{ ...investmentConfig }}
    />

    {investmentConfig ? (
      <EarlyRepaymentVsInvestmentAnalysisResult
        loanRepayment={loanRepayment}
        loanConfig={loanConfig}
        investmentConfig={investmentConfig}
      />
    ) : (
      <ResultsPlaceholder />
    )}
  </>
);

export default CompareEarlyRepaymentWithInvestment;
