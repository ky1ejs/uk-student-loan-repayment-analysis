import InvestmentConfig from "../types/InvestmentConfig";

const MONTHS_IN_YEAR = 12;

export interface LoanConfig {
  salary: number;
  repaymentThreshold: number;
  repaymentPercentage: number;
  debt: number;
  interest: number;
  extraAnnualRepayment?: number;
}

interface Repayement {
  remaining: number;
  interestedAcrued: number;
  repayed: number;
}

interface YearSummary {
  repayments: Repayement[];
  totalInterest: number;
  totalRepayments: number;
  balance: number;
}

export interface LoanRepaymentResult {
  repayments: YearSummary[];
  totalInterest: number;
  totalMonths: number;
}

export function calculateLoanRepayment(
  config: LoanConfig
): LoanRepaymentResult {
  if (config.salary <= config.repaymentThreshold) {
    return { repayments: [], totalInterest: 0, totalMonths: 0 };
  }
  const monthlySalaryRepayment =
    ((config.salary - config.repaymentThreshold) / 12) *
    config.repaymentPercentage;

  let { debt: remainingDebt } = config;

  const yearSummary: YearSummary[] = [];
  let repayments: Repayement[] = [];
  let month = 1;
  let totalInterest = 0;
  let totalRepayments = 0;
  let totalMonths = 0;

  while (remainingDebt > 0) {
    // Add interest
    const interestedAcrued = (remainingDebt * config.interest) / 12;
    remainingDebt += interestedAcrued;

    // Make salary repayment
    const repay = Math.min(remainingDebt, monthlySalaryRepayment);
    remainingDebt = Math.max(0, remainingDebt - repay);

    // Make extra payment if there is one
    if (config.extraAnnualRepayment && config.extraAnnualRepayment > 0) {
      remainingDebt = Math.max(
        0,
        remainingDebt - config.extraAnnualRepayment / 12
      );
    }

    repayments.push({
      remaining: remainingDebt,
      interestedAcrued,
      repayed: repay,
    });

    totalInterest += interestedAcrued;
    totalRepayments += repay;

    if (month >= MONTHS_IN_YEAR || remainingDebt <= 0) {
      yearSummary.push({
        repayments,
        totalInterest,
        totalRepayments,
        balance: remainingDebt,
      });
      month = 1;
      totalInterest = 0;
      totalRepayments = 0;
      repayments = [];
    } else {
      month++;
    }

    totalMonths++;
  }

  return {
    repayments: yearSummary,
    totalInterest: yearSummary
      .map((r) => r.totalInterest)
      .reduce((a, c) => a + c, 0),
    totalMonths,
  };
}

interface InvestmentMonth {
  balance: number;
  ytdInvested: number;
  ytdInterestEarned: number;
  interstThisMonth: number;
}

export interface InvestmentPerformance {
  investmentMonths: InvestmentMonth[];
  balance: number;
  invested: number;
  interestEarned: number;
}

export function calculateInvestment(
  investment: InvestmentConfig,
  months: number
): InvestmentPerformance {
  const { investment: invest, expectedAnnualReturn: interest } =
    investment;
  const monthlyInvestment = invest / MONTHS_IN_YEAR;

  const investmentMonths: InvestmentMonth[] = [];
  let balance = 0;
  let invested = 0;
  let totalInterestEarned = 0;

  for (let i = 0; i < months; i++) {
    invested += monthlyInvestment;
    balance += monthlyInvestment;

    const interestEarned = (balance * interest) / MONTHS_IN_YEAR;
    totalInterestEarned += interestEarned;

    balance += interestEarned;

    investmentMonths.push({
      balance: Math.round(balance),
      ytdInvested: Math.round(invested),
      ytdInterestEarned: Math.round(totalInterestEarned),
      interstThisMonth: Math.round(interestEarned),
    });
  }

  return {
    investmentMonths,
    balance: Math.round(balance),
    invested: Math.round(invested),
    interestEarned: Math.round(totalInterestEarned),
  };
}
