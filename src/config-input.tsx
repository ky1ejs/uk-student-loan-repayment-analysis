import React, { useEffect, useState } from "react";
import { Config } from "./analysis";

const ConfigInput = ({onConfigSet}: {onConfigSet: (c: Config) => void}) => {
  const [config, setConfig] = useState<Partial<Config>>({})
  useEffect(() => {
    if (config.debt && config.interest && config.repaymentThreshold && config.salary) {
      onConfigSet({
        debt: config.debt,
        salary: config.salary,
        repaymentThreshold: config.repaymentThreshold,
        interest: config.interest
      })
    }
  }, [config])

  const onSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({...config, salary: parseFloat(e.target.value) * 100})
  }
  const onDebt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({...config, debt: parseFloat(e.target.value) * 100})
  }
  const onRepayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({...config, repaymentThreshold: parseFloat(e.target.value) * 100})
  }
  const onInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({...config, interest: parseFloat(e.target.value)})
  }

  return (
    <>
      <input placeholder="salary" onChange={onSalary}/>
      <input placeholder="debt" onChange={onDebt}/>
      <input placeholder="repayment" onChange={onRepayment}/>
      <input placeholder="interest" onChange={onInterest}/>
    </>
  )
}

export default ConfigInput;