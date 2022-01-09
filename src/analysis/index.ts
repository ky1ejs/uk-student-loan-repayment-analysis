
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

interface Result {
  repayments: Repayement[]
}

function analyse(config: Config) {
  let { debt: remainingDebt } = config;

  var repayments: Repayement[] = [];

  while (remainingDebt > 0) {
    const monthlySalary = (config.salary - config.repaymentThreshold) / 12
    const repaymentAmount = monthlySalary * 0.9
    remainingDebt -= repaymentAmount
    const interestedAcrued = remainingDebt * config.interest / 12
    repayments.push({remaining: remainingDebt, interestedAcrued, repayed: repaymentAmount})
  }
}