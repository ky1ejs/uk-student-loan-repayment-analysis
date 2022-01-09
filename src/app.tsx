import React, { useState } from "react";
import { analyse, Config } from "./analysis";
import ConfigInput from "./config-input";

const App = () => {
  const [config, setConfig] = useState<Config | undefined>(undefined)
  
  const onConfigSet = (c?: Config) => {
    setConfig(c)
  }

  let analysis: JSX.Element | null = null
  if (config) {
    const result = analyse(config)
    analysis = (
      <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Remaining</th>
            <th>Repayed</th>
            <th>Interest</th>
          </tr>
        </thead>
        <tbody>
          {result.repayments.map((r, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{r.balance / 100}</td>
              <td>{r.totalRepayments / 100}</td>
              <td>{r.totalInterest / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
      Total interest: {result.totalInterest / 100}
      </>
    )
  }

  return (
    <>
      <div>
        <ConfigInput onConfigSet={onConfigSet} />
      </div>
      <div>
        {analysis}
      </div>
    </>
  )
}

export default App;