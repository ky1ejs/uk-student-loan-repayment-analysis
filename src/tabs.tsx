import React from "react";
import { Box, Tabs as TabsContainer, Tab } from "@mui/material";
import { calculateLoanRepayment, LoanConfig } from "./analysis";
import TabPanel from "./components/TabPanel";
import CompareEarlyRepaymentWithInvestment from "./panels/compare-early-repayment";
import RepaymentSchedule from "./panels/repayment-schedule";
import InvestmentConfig from "./types/InvestmentConfig";
import ResultsPlaceholder from "./panels/compare-early-repayment/ResultsPlaceholder";

interface TabsProps { loanConfig?: LoanConfig, investmentConfig?: InvestmentConfig, setInvestmentConfig: (c?: InvestmentConfig) => void }

const Tabs = ({ loanConfig, investmentConfig, setInvestmentConfig }: TabsProps) => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  const loanRepayment = loanConfig ? calculateLoanRepayment(loanConfig) : undefined;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabsContainer
          value={currentTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Scheduled" />
          <Tab label="Repay Early?" />
        </TabsContainer>
      </Box>

      <TabPanel currentTab={currentTab} index={0}>
        {loanRepayment ? <RepaymentSchedule repayment={loanRepayment} /> : <ResultsPlaceholder/>}
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        {loanConfig && loanRepayment ? <CompareEarlyRepaymentWithInvestment
          loanRepayment={loanRepayment}
          loanConfig={loanConfig}
          investmentConfig={investmentConfig}
          setInvestmentConfig={setInvestmentConfig}
        /> : <ResultsPlaceholder/>}
      </TabPanel>
    </Box>
  );
};

export default Tabs;
