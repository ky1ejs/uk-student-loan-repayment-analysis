import AnnuallyOrMonthly from "./AnnuallyOrMonthly";

interface InvestmentConfigInput {
  investment: string;
  expectedAnnualReturn: string;
  investmentFrequency: AnnuallyOrMonthly;
  investLoanPayments: boolean;
}

export default InvestmentConfigInput;
