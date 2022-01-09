import React, { useState } from "react";
import { Config } from "./analysis";
import AnalysisTable from "./analysis-table";
import ConfigInput from "./config-input";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import Section from "./components/Section";

const Container = styled.div`
  margin: auto;
  max-width: 1000px;
`;

const App = () => {
  const [config, setConfig] = useState<Config | undefined>(undefined);

  const onConfigSet = (c?: Config) => {
    setConfig(c);
  };

  return (
    <CssBaseline>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Student Loan Repayment Analysis
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Section>
          <ConfigInput onConfigSet={onConfigSet} />
        </Section>
        <Section>
          <AnalysisTable config={config} />
        </Section>
      </Container>
    </CssBaseline>
  );
};

export default App;
