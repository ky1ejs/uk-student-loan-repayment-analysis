const MONTHS_IN_YEAR = 12;

export interface Config {
  salary: number;
  repaymentThreshold: number;
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

interface Result {
  repayments: YearSummary[];
  totalInterest: number;
}

export function analyse(config: Config): Result {
  if (config.salary <= config.repaymentThreshold) {
    return { repayments: [], totalInterest: 0 };
  }
  const monthlySalaryRepayment =
    ((config.salary - config.repaymentThreshold) / 12) * 0.09;

  let { debt: remainingDebt } = config;

  const yearSummary: YearSummary[] = [];
  let repayments: Repayement[] = [];
  let month = 1;
  let totalInterest = 0;
  let totalRepayments = 0;

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
      console.log(totalRepayments);
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
  }

  return {
    repayments: yearSummary,
    totalInterest: yearSummary
      .map((r) => r.totalInterest)
      .reduce((a, c) => a + c, 0),
  };
}

export function calculateInvestment(invest: number, interst: number, years: number): number {
  return Array.from(Array(years)).reduce((prev) => (prev * interst) + invest, 0) - (invest * years);
}
