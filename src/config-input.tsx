import { ToggleButton, ToggleButtonGroup, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LoanConfig } from "./analysis";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import styled from "styled-components";
import MonthSelector from "./components/MonthSelector";
import PaymentSchedule from "./types/PaymentSchedule";
import PoundTextField from "./components/PoundTextField";
import PercentageInput from "./panels/compare-early-repayment/PercentageInput";
import HelpTooltipButton from "./components/HelpTooltipButton";
import parsePound from "./util/parse-pound";
import parsePercentage from "./util/parse-percentage";
import DateAdapter from "@mui/lab/AdapterMoment";

const Flex = styled.div`
  display: flex;
  gap: 8px;
`;

const InputRow = styled.div`
  margin: 24px 0;
`;

interface LoanConfigInputs {
  salary: string;
  repaymentThreshold: string;
  debt: string;
  interest: string;
  repaymentPercentage: string;
}

const ConfigInput = ({
  onConfigSet,
}: {
  onConfigSet: (c?: LoanConfig) => void;
}) => {
  const [config, setConfig] = useState<LoanConfigInputs>({
    salary: "",
    repaymentThreshold: "",
    debt: "",
    interest: "1.5",
    repaymentPercentage: "9",
  });
  const [paymentSchedule, setPaymentSchedule] = React.useState(
    PaymentSchedule.Anually
  );
  const [dateLeftUniversity, setDateLeftUniversity] =
    React.useState<Date | null>(new Date());

  useEffect(() => {
    const debt = parsePound(config.debt);
    const repaymentThreshold = parsePound(config.repaymentThreshold);
    const salary = parsePound(config.salary);
    const interest = parsePercentage(config.interest);
    const repaymentPercentage = parsePercentage(config.repaymentPercentage);

    if (
      debt &&
      interest &&
      repaymentThreshold &&
      salary &&
      repaymentPercentage
    ) {
      onConfigSet({
        debt,
        salary:
          paymentSchedule === PaymentSchedule.Anually ? salary : salary * 12,
        repaymentThreshold,
        interest,
        repaymentPercentage,
      });
    } else {
      onConfigSet(undefined);
    }
  }, [config, paymentSchedule]);

  const validateNumber = (text: string): boolean => {
    return text === "" || !isNaN(parseFloat(text));
  };

  const onSalary = (value: string) => {
    // if (!validateNumber(value)) return;
    setConfig({ ...config, salary: value });
  };

  const onDebt = (value: string) => {
    // if (!validateNumber(e.target.value)) return;
    setConfig({ ...config, debt: value });
  };

  const onRepayment = (value: string) => {
    // if (!validateNumber(evalue)) return;
    setConfig({ ...config, repaymentThreshold: value });
  };

  const onInterest = (value: string) => {
    if (!validateNumber(value)) return;
    setConfig({ ...config, interest: value });
  };

  const onRepaymentPercentage = (value: string) => {
    if (!validateNumber(value)) return;
    setConfig({ ...config, repaymentPercentage: value });
  };

  const selectPlan1Threshold = () => {
    setConfig({ ...config, repaymentThreshold: "19895" });
  };

  const selectPlan2Threshold = () => {
    setConfig({ ...config, repaymentThreshold: "27295" });
  };

  return (
    <>
      <h2>Your Income &amp; Loan</h2>
      <InputRow>
        <Flex>
          <PoundTextField
            id="salary"
            label="Gross Salary"
            onChange={onSalary}
            value={config.salary}
          />
          <MonthSelector
            initialSelection={paymentSchedule}
            onChange={setPaymentSchedule}
          />
        </Flex>
      </InputRow>
      <InputRow>
        <PoundTextField
          id="debt"
          label="Remaining Loan Balance"
          onChange={onDebt}
          value={config.debt}
          hint={
            <>
              The outstanding balance of your loan. You can find this out{" "}
              <a
                target="_blank"
                href="https://www.gov.uk/sign-in-to-manage-your-student-loan-balance"
              >
                here
              </a>
              .
            </>
          }
          fullWidth
        />
      </InputRow>
      <InputRow>
        <PoundTextField
          id="threshold"
          label="Repayment Threshold"
          onChange={onRepayment}
          value={config.repaymentThreshold}
          tooltip={
            <div>
              This depends on which "Plan" you're on. Check the latest
              thresholds{" "}
              <a
                target="_blank"
                href="https://www.gov.uk/repaying-your-student-loan/when-you-start-repaying"
              >
                here
              </a>
              .
            </div>
          }
          hint={
            <>
              Default to:{" "}
              <ToggleButtonGroup sx={{ marginTop: "2px" }} size="small">
                <ToggleButton value="plan-1" onClick={selectPlan1Threshold}>
                  Plan 1
                </ToggleButton>
                <ToggleButton value="plan-2" onClick={selectPlan2Threshold}>
                  Plan 2
                </ToggleButton>
              </ToggleButtonGroup>{" "}
              <HelpTooltipButton>
                <div>These values were last checked 10th of Jan 2022.</div>
              </HelpTooltipButton>
            </>
          }
          fullWidth
        />
      </InputRow>
      <InputRow>
        <PercentageInput
          id="interest"
          label="Interest"
          onChange={onInterest}
          value={config.interest}
          fullWidth
          tooltip={
            <div>
              This depends on your salary, but with a recent change (perhaps{" "}
              <a href="https://www.gov.uk/government/news/student-loans-interest-rates-and-repayment-threshold-announcement--2">
                here
              </a>
              ) this value seems to be 1.5% for most people. The latest interst
              information is{" "}
              <a
                target="_blank"
                href="https://www.gov.uk/sign-in-to-manage-your-student-loan-balance"
              >
                here
              </a>{" "}
              and you can find your actual interest rate{" "}
              <a
                target="_blank"
                href="https://www.gov.uk/repaying-your-student-loan/what-you-pay"
              >
                here
              </a>
              .
            </div>
          }
        />
      </InputRow>
      <InputRow>
        <PercentageInput
          id="repayment"
          label="Repayment Percentage"
          onChange={onRepaymentPercentage}
          value={config.repaymentPercentage}
          fullWidth
          tooltip={
            <div>
              This has been 9% for quite some time. Double check this value{" "}
              <a
                target="_blank"
                href="https://www.gov.uk/repaying-your-student-loan/what-you-pay"
              >
                here
              </a>
              .
            </div>
          }
        />
      </InputRow>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          disableFuture
          label="Month after finishing University"
          openTo="year"
          views={["year", "month"]}
          value={dateLeftUniversity}
          onChange={setDateLeftUniversity}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default ConfigInput;
