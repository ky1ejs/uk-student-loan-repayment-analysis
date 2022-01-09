import React, { useState } from "react";
import { Config } from "./analysis";
import AnalysisTable from "./analysis-table";
import ConfigInput from "./config-input";

const App = () => {
  const [config, setConfig] = useState<Config | undefined>(undefined)
  
  const onConfigSet = (c?: Config) => {
    setConfig(c)
  }

  return (
    <>
      <div>
        <ConfigInput onConfigSet={onConfigSet} />
      </div>
      <div>
        <AnalysisTable config={config} />
      </div>
    </>
  )
}

export default App;