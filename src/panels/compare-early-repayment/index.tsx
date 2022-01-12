import React from "react";
import { LoanConfig, LoanRepaymentResult } from "../../analysis";
import InvestmentInput from "./InvestmentInput";
import EarlyRepaymentVsInvestmentAnalysisResult from "./EarlyRepaymentVsInvestmentAnalysisResult";
import Section from "../../components/Section";
import InvestmentConfigInput from "../../types/InvestmentInput";

const CompareEarlyRepaymentWithInvestment = ({
  loanRepayment,
  loanConfig,
  investmentConfigInput,
  setInvestmentConfig,
}: {
  loanRepayment: LoanRepaymentResult;
  loanConfig: LoanConfig;
  investmentConfigInput: InvestmentConfigInput;
  setInvestmentConfig: (c: InvestmentConfigInput) => void;
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
      investmentConfigInput={investmentConfigInput}
    />
    <EarlyRepaymentVsInvestmentAnalysisResult
      loanRepayment={loanRepayment}
      loanConfig={loanConfig}
      investmentConfigInput={investmentConfigInput}
    />
  </>
);

export default CompareEarlyRepaymentWithInvestment;
