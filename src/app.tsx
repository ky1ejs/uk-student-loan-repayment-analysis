import React, { useState } from "react";
import { LoanConfig } from "./analysis";
import ConfigInput from "./config-input";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Section from "./components/Section";
import Tabs from "./tabs";

const Container = styled.div`
  margin: auto;
  max-width: 1000px;
`;

const App = () => {
  const [config, setConfig] = useState<LoanConfig | undefined>(undefined);

  const onConfigSet = (c?: LoanConfig) => {
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
        <Section>{config && <Tabs config={config} />}</Section>
      </Container>
    </CssBaseline>
  );
};

export default App;
