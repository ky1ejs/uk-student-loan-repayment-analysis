import { Box, Tabs, Tab, TextField, Card, CardContent, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import { analyse, calculateInvestment, Config } from "./analysis";
import styled from "styled-components";
import Section from "./components/Section";
import ButtonSelector from "./components/ButtonSelector";

enum PaymentSchedule { 
  Monthly, Anually
}

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
  const [paymentSchedule, setPaymentSchedule] = React.useState(PaymentSchedule.Monthly)

  if (!config) return null;

  const formatter = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  const result = analyse(config);

  const repaymentAmount = paymentSchedule === PaymentSchedule.Monthly ? extraAnnualRepayment * 12 : extraAnnualRepayment
  const compareResult = analyse({ ...config, extraAnnualRepayment: repaymentAmount });
  const roi =
    extraAnnualRepayment > 0 && investmentReturn > 0
      ? calculateInvestment(
          repaymentAmount,
          investmentReturn,
          result.totalMonths
        )
      : undefined;
  const roiCompare =
    extraAnnualRepayment > 0 && investmentReturn > 0
      ? calculateInvestment(
          repaymentAmount,
          investmentReturn,
          result.totalMonths - compareResult.totalMonths
        )
      : undefined;

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

  const row3: GridRowsProp = roi
    ? roi.investmentMonths.map((r, i) => {
        return {
          id: i + 1,
          col1: formatter.format(r.balance / 100),
          col2: formatter.format(r.interstThisMonth / 100),
          col3: formatter.format(r.ytdInterestEarned / 100),
          col4: formatter.format(r.ytdInvested / 100),
        };
      })
    : [];

  const columns3: GridColDef[] = [
    { field: "id", headerName: "#", width: 25 },
    { field: "col1", headerName: "Balance", width: 100 },
    { field: "col2", headerName: "Interest", width: 100 },
    { field: "col3", headerName: "YTD Interest", width: 100 },
    { field: "col4", headerName: "TTD Invested", width: 100 },
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
          <h2>Repayments &amp; Return</h2>
          <div>
          <TextField
            label="Repayment"
            variant="outlined"
            onChange={handleExtraRepaymentChange}
          /> <ButtonSelector initialValue={PaymentSchedule.Anually} options={[{key: "y", title: "Annually", value: PaymentSchedule.Anually}, {key: "m", title: "Monthly", value: PaymentSchedule.Monthly}]} onChange={(o) => setPaymentSchedule(o.value)}/>
          </div>
          <div>
          <TextField
            label="Return"
            variant="outlined"
            onChange={handleInvestmentReturnChange}
          />
          </div>
          <h2>Result</h2>
          {roi && roiCompare && (
            <Flex>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Prioritise Investing
                </Typography>
                <p>{result.repayments.length} years repaying &amp; investing</p>
                <p>
                  {formatter.format(result.totalInterest / 100)} loan interest
                  cost
                </p>
                <p>
                  {formatter.format(roi.interestEarned / 100)} investment
                  interest earned
                </p>
                <p>
                  {formatter.format(
                    (roi.interestEarned - result.totalInterest) / 100
                  )}{" "}
                  balance
                </p>
                {/* Your loan will take {result.repayments.length} years ({result.totalMonths} in months) to repay and will cost {formatter.format(result.totalInterest / 100)} in interest.*/}
                </CardContent>
              </Card>
              <div>vs</div>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Prioritise Loan Repayment
                </Typography>
                <p>{compareResult.repayments.length} years repaying, then {Math.floor(roiCompare.investmentMonths.length / 12)} years investing</p>
                <p>
                  {formatter.format(compareResult.totalInterest / 100)} loan
                  interest cost
                </p>
                <p>
                  {formatter.format(roiCompare.interestEarned / 100)} investment
                  interest earned
                </p>
                <p>
                  {formatter.format(
                    (roiCompare.interestEarned - compareResult.totalInterest) /
                      100
                  )}{" "}
                  balance
                </p>
                {/* Over {roi.investmentMonths.length} months you'd make {formatter.format(roi.interestEarned / 100)} in interest with investment balance of {formatter.format(roi.balance / 100)}. */}
                </CardContent>
              </Card>
              <div>=</div>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                {roi.interestEarned -
                  result.totalInterest -
                  (roiCompare.interestEarned - compareResult.totalInterest) >
                0 ? (
                  <>
                    <p>Focus on Investment!</p>
                    You'll be{" "}
                    {formatter.format(
                      (roi.interestEarned -
                        result.totalInterest -
                        (roiCompare.interestEarned -
                          compareResult.totalInterest)) /
                        100
                    )}{" "}
                    better off.
                  </>
                ) : (
                  <>
                    <p>Repay Early!</p>
                    You'll be{" "}
                    {formatter.format(
                      Math.abs(
                        (roi.interestEarned -
                          result.totalInterest -
                          (roiCompare.interestEarned -
                            compareResult.totalInterest)) /
                          100
                      )
                    )}{" "}
                    better off.
                  </>
                )}
                {/* If you used the your investment money you'd repay your loan in {compareResult.repayments.length} years ({result.repayments.length - compareResult.repayments.length} years early), saving {formatter.format((result.totalInterest - compareResult.totalInterest) / 100)} in interest. */}
                </CardContent>
              </Card>
            </Flex>
          )}
        </Section>
        <Section>
          <Flex>
            <div style={{ height: 450, width: "100%" }}>
              <DataGrid rows={row3} columns={columns3} autoPageSize />
            </div>
            <div style={{ height: 450, width: "100%" }}>
              <DataGrid rows={rows2} columns={columns2} autoPageSize />
            </div>
          </Flex>
        </Section>
        <Section>
          <Flex>
            <div style={{ height: 450, width: "100%" }}>
              <DataGrid rows={rows} columns={columns} autoPageSize />
            </div>
          </Flex>
        </Section>
      </TabPanel>
    </Box>
  );
};

export default AnalysisTable;
