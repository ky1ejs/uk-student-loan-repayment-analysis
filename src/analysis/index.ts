import moment from "moment";
import AnnuallyOrMonthly from "../types/AnnuallyOrMonthly";
import InvestmentConfig from "../types/InvestmentConfig";
import SfeConstants from "../types/SfeConstants";

const MONTHS_IN_YEAR = 12;

export interface LoanConfig {
  salary: number;
  repaymentThreshold: number;
  repaymentPercentage: number;
  debt: number;
  interest: number;
  extraAnnualRepayment?: number;
  monthAfterLeavingUni: Date;
}

interface Repayement {
  remaining: number;
  interestAcrued: number;
  totalRepayed: number;
  salaryPayment: number;
  voluntaryPayment: number;
}

interface YearSummary {
  repayments: Repayement[];
  totalInterest: number;
  totalInterestToDate: number;
  totalPayments: number;
  totalSalaryPayments: number;
  totalVoluntaryPayments: number;
  balance: number;
}

export interface LoanRepaymentResult {
  payments: YearSummary[];
  totalInterestAcrued: number;
  totalMonths: number;
  writtenOff: boolean;
  amountWrittenOff: number;
  incomeBelowThreshold: boolean;
  monthlySalaryPayment: number;
  totalPayments: number;
  totalSalaryPayments: number;
  totalVoluntaryPayments: number;
  totalInterestPaid: number;
}

export function calculateLoanRepayment(
  config: LoanConfig
): LoanRepaymentResult {
  if (config.salary <= config.repaymentThreshold) {
    return {
      incomeBelowThreshold: true,
      payments: [],
      totalInterestAcrued: 0,
      totalMonths: 0,
      writtenOff: false,
      amountWrittenOff: 0,
      monthlySalaryPayment: 0,
      totalInterestPaid: 0,
      totalPayments: 0,
      totalSalaryPayments: 0,
      totalVoluntaryPayments: 0,
    };
  }

  let { debt: remainingDebt } = config;
  const yearSummary: YearSummary[] = [];
  let repayments: Repayement[] = [];
  const monthlySalaryPayment =
    ((config.salary - config.repaymentThreshold) / MONTHS_IN_YEAR) *
    config.repaymentPercentage;

  let month = 1;
  let totalAnnualInterest = 0;
  let totalAnnualPayments = 0;
  let totalAnnualSalaryPayments = 0;
  let totalAnnualVoluntaryPayments = 0;

  let totalInterestAcrued = 0;
  let totalPayments = 0;
  let totalSalaryPayments = 0;
  let totalVoluntaryPayments = 0;

  let totalMonths = Math.floor(
    moment(new Date()).diff(moment(config.monthAfterLeavingUni), "months", true)
  );

  while (
    remainingDebt > 0 &&
    totalMonths < SfeConstants.MAX_REPAYMENT_YEARS * MONTHS_IN_YEAR
  ) {
    // Add interest
    const interestAcrued = (remainingDebt * config.interest) / MONTHS_IN_YEAR;
    remainingDebt += interestAcrued;

    // Make salary repayment
    const salaryPayment = Math.min(remainingDebt, monthlySalaryPayment);
    remainingDebt -= salaryPayment;

    // Make extra payment if there is one
    let voluntaryPayment = 0;
    if (
      remainingDebt > 0 &&
      config.extraAnnualRepayment &&
      config.extraAnnualRepayment > 0
    ) {
      voluntaryPayment = Math.min(
        remainingDebt,
        config.extraAnnualRepayment / MONTHS_IN_YEAR
      );
      remainingDebt -= voluntaryPayment;
    }

    repayments.push({
      remaining: remainingDebt,
      interestAcrued,
      totalRepayed: salaryPayment + voluntaryPayment,
      salaryPayment,
      voluntaryPayment,
    });

    totalAnnualInterest += interestAcrued;
    totalAnnualPayments += salaryPayment + voluntaryPayment;
    totalAnnualSalaryPayments += salaryPayment;
    totalAnnualVoluntaryPayments += voluntaryPayment;

    totalInterestAcrued += interestAcrued;
    totalPayments += salaryPayment + voluntaryPayment;
    totalSalaryPayments += salaryPayment;
    totalVoluntaryPayments += voluntaryPayment;

    if (month >= MONTHS_IN_YEAR || remainingDebt <= 0) {
      yearSummary.push({
        repayments,
        totalInterest: totalAnnualInterest,
        totalInterestToDate: totalInterestAcrued,
        totalPayments: totalAnnualPayments,
        totalSalaryPayments: totalAnnualSalaryPayments,
        totalVoluntaryPayments: totalAnnualVoluntaryPayments,
        balance: remainingDebt,
      });

      month = 1;
      totalAnnualInterest = 0;
      totalAnnualPayments = 0;
      totalAnnualSalaryPayments = 0;
      totalAnnualVoluntaryPayments = 0;
      repayments = [];
    } else {
      month++;
    }

    totalMonths++;
  }

  return {
    payments: yearSummary,
    totalInterestAcrued,
    totalMonths,
    totalPayments,
    totalSalaryPayments,
    totalVoluntaryPayments,
    totalInterestPaid: Math.max(0, totalPayments - config.debt),
    incomeBelowThreshold: false,
    writtenOff: remainingDebt > 0,
    amountWrittenOff: remainingDebt,
    monthlySalaryPayment,
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
  const {
    investment: invest,
    expectedAnnualReturn: interest,
    investmentFrequency,
  } = investment;
  const monthlyInvestment =
    investmentFrequency === AnnuallyOrMonthly.Anually
      ? invest / MONTHS_IN_YEAR
      : invest;

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
