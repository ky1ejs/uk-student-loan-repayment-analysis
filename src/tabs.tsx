import React from "react";
import { Box, Tabs as TabsContainer, Tab } from "@mui/material";
import { calculateLoanRepayment, LoanConfig } from "./analysis";
import TabPanel from "./components/TabPanel";
import CompareEarlyRepaymentWithInvestment from "./panels/compare-early-repayment";
import RepaymentSchedule from "./panels/repayment-schedule";

const Tabs = ({ config }: { config: LoanConfig }) => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const loanRepayment = calculateLoanRepayment(config);

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabsContainer
          value={currentTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Scheduled Repayments" />
          <Tab label="Should I Repay Early?" />
        </TabsContainer>
      </Box>

      <TabPanel currentTab={currentTab} index={0}>
        <RepaymentSchedule repayment={loanRepayment} />
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        <CompareEarlyRepaymentWithInvestment
          loanRepayment={loanRepayment}
          loanConfig={config}
        />
      </TabPanel>
    </Box>
  );
};

export default Tabs;
