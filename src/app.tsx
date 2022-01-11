import React, { useState } from "react";
import { LoanConfig } from "./analysis";
import ConfigInput from "./config-input";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Section from "./components/Section";
import Tabs from "./tabs";
import Footer from "./components/Footer";

const Page = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Content = styled.div`
  margin: auto;
  padding: 0 34px;
  max-width: 1000px;
  padding-bottom: 110px;

  @media only screen and (max-width: 800px) {
    padding-bottom: 150px;
  }
`;

const App = () => {
  const [config, setConfig] = useState<LoanConfig | undefined>(undefined);

  const onConfigSet = (c?: LoanConfig) => {
    setConfig(c);
  };

  return (
    <CssBaseline>
      <Page>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
              Student Loan Repayment Analysis
            </Typography>
          </Toolbar>
        </AppBar>
        <Content>
          <Section>
            <ConfigInput onConfigSet={onConfigSet} />
          </Section>
          <Section>{config && <Tabs config={config} />}</Section>
        </Content>
        <Footer />
      </Page>
    </CssBaseline>
  );
};

export default App;
