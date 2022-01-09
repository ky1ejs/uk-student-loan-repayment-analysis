import React, { useState } from "react";
import { Config } from "./analysis";
import ConfigInput from "./config-input";

const App = () => {
  const [analysis, setAnalysis] = useState<JSX.Element | null>(null)
  const onConfigSet = (c: Config) => {
    setAnalysis(<>Hello</>)
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