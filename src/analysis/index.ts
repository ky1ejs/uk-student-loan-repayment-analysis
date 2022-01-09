
const MONTHS_IN_YEAR = 12

export interface Config { 
  salary: number
  repaymentThreshold: number
  debt: number
  interest: number
}

interface Repayement {
  remaining: number
  interestedAcrued: number
  repayed: number
}

interface YearSummary {
  repayments: Repayement[]
  totalInterest: number
  totalRepayments: number
  balance: number
}

interface Result {
  repayments: YearSummary[]
  totalInterest: number
}

export function analyse(config: Config): Result {
  if (config.salary <= config.repaymentThreshold) {
    return {repayments: [], totalInterest: 0}
  }

  let { debt: remainingDebt } = config;

  let yearSummary: YearSummary[] = []
  let repayments: Repayement[] = [];
  let month = 0;

  let totalInterest = 0
  let totalRepayments = 0

  while (remainingDebt > 0) {
    month++

    const monthlySalary = (config.salary - config.repaymentThreshold) / 12
    const repaymentAmount = Math.min(remainingDebt, monthlySalary * 0.09)
    remainingDebt = Math.max(0, remainingDebt - repaymentAmount)
    const interestedAcrued = remainingDebt * config.interest / 12

    repayments.push({remaining: remainingDebt, interestedAcrued, repayed: repaymentAmount})

    totalInterest += interestedAcrued
    totalRepayments += repaymentAmount

    if (month >= MONTHS_IN_YEAR || remainingDebt == 0) {
      yearSummary.push({repayments, totalInterest, totalRepayments, balance: remainingDebt})
      month = 0
      totalInterest = 0
      totalRepayments = 0
      repayments = []
    }
  }

  

  return { repayments: yearSummary, totalInterest: yearSummary.map(r => r.totalInterest).reduce((a, c) => a + c, 0) }
}