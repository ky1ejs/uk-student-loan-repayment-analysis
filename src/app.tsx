import React, { useState } from "react";
import { LoanConfig } from "./analysis";
import ConfigInput from "./config-input";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Section from "./components/Section";
import Tabs from "./tabs";
import Footer from "./components/Footer";
import InvestmentConfigInput from "./types/InvestmentInput";
import AnnuallyOrMonthly from "./types/AnnuallyOrMonthly";

const Page = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Content = styled.div`
  margin: auto;
  padding: 0 34px;
  max-width: 1000px;
  padding-bottom: 195px;
`;

const App = () => {
  const [loanConfig, setLoanConfig] = useState<LoanConfig | undefined>(
    undefined
  );
  const [investmentConfig, setInvestmentConfig] =
    useState<InvestmentConfigInput>({
      investment: "",
      expectedAnnualReturn: "",
      investmentFrequency: AnnuallyOrMonthly.Monthly,
      investLoanPayments: true,
    });

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
            <ConfigInput onConfigSet={setLoanConfig} />
          </Section>
          <Section>
            <Tabs
              loanConfig={loanConfig}
              investmentConfig={investmentConfig}
              setInvestmentConfig={setInvestmentConfig}
            />
          </Section>
        </Content>
        <Footer />
      </Page>
    </CssBaseline>
  );
};

export default App;
