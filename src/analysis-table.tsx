import { Box, Tabs, Tab, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import { analyse, calculateInvestment, Config } from "./analysis";
import styled from "styled-components";
import Section from "./components/Section";

const Flex = styled.div`
  display: flex;
  gap: 16px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const TabPanel = ({
  currentTab,
  index,
  children,
}: {
  currentTab: number;
  index: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      hidden={currentTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {currentTab === index && <>{children}</>}
    </div>
  );
};

const AnalysisTable = ({ config }: { config?: Config }) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const [extraAnnualRepayment, setExtraAnnualRepayment] = React.useState(0);
  const [investmentReturn, setInvestmentReturn] = React.useState(0);

  if (!config) return null;

  const formatter = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  const result = analyse(config);
  const compareResult = analyse({ ...config, extraAnnualRepayment });
  const roi = (extraAnnualRepayment > 0 && investmentReturn > 0) ? calculateInvestment(extraAnnualRepayment, investmentReturn, result.repayments.length) : 0
  

  const rows: GridRowsProp = result.repayments.map((r, i) => {
    return {
      id: i + 1,
      col1: formatter.format(r.balance / 100),
      col2: formatter.format(r.totalRepayments / 100),
      col3: formatter.format(r.totalInterest / 100),
    };
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 25 },
    { field: "col1", headerName: "Balance", width: 150 },
    { field: "col2", headerName: "Repayment", width: 150 },
    { field: "col3", headerName: "Interest", width: 150 },
  ];

  const rows2: GridRowsProp = compareResult.repayments.map((r, i) => {
    return {
      id: i + 1,
      col1: formatter.format(r.balance / 100),
      col2: formatter.format(r.totalRepayments / 100),
      col3: formatter.format(r.totalInterest / 100),
      col4: formatter.format(extraAnnualRepayment / 100),
    };
  });

  const columns2: GridColDef[] = [
    { field: "id", headerName: "#", width: 25 },
    { field: "col1", headerName: "Balance", width: 100 },
    { field: "col2", headerName: "Repayment", width: 100 },
    { field: "col3", headerName: "Interest", width: 100 },
    { field: "col4", headerName: "Extra Repayment", width: 100 },
  ];

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setCurrentTab(value);
  };

  const handleExtraRepaymentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExtraAnnualRepayment(parseFloat(e.target.value) * 100);
  };

  const handleInvestmentReturnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInvestmentReturn(parseFloat(e.target.value));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Scheduled Repayments" />
          <Tab label="Should I Repay Early?" />
        </Tabs>
      </Box>
      <TabPanel currentTab={currentTab} index={0}>
        <h2>Summary</h2>
        <p>
          You'll pay your Student Loan off in{" "}
          <Bold>
            {result.repayments.length} year
            {result.repayments.length > 1 ? "s" : ""}
          </Bold>
          . You'll pay a total of{" "}
          <Bold>
            {formatter.format(result.totalInterest / 100)} in interest
          </Bold>
          .
        </p>

        <h2>Breakdown</h2>
        <div style={{ height: 450, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} autoPageSize />
        </div>
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        <Section>
          <TextField
            label="Extra repayments per year"
            variant="outlined"
            onChange={handleExtraRepaymentChange}
          />
          <TextField
            label="Expected investment return"
            variant="outlined"
            onChange={handleInvestmentReturnChange}
          />
          <p>{formatter.format(roi / 100)}</p>
        </Section>
        <Section>
          <Flex>
            <div style={{ height: 450, width: "100%" }}>
              <DataGrid rows={rows} columns={columns} autoPageSize />
            </div>
            <div style={{ height: 450, width: "100%" }}>
              <DataGrid rows={rows2} columns={columns2} autoPageSize />
            </div>
          </Flex>
        </Section>
      </TabPanel>
    </Box>
  );
};

export default AnalysisTable;
