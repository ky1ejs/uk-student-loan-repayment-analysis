import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LoanConfig } from "./analysis";
import styled from "styled-components";
import MonthSelector from "./components/MonthSelector";
import PaymentSchedule from "./types/PaymentSchedule";

const InlineButton = styled.span`
  text-decoration: underline;
  cursor: pointer;

  :hover {
    color: blue;
  }
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
  onConfigSet: (c: LoanConfig) => void;
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

  const parsePound = (value?: string) => {
    if (!value) return undefined;
    const parsedValue = parseFloat(value);
    return parsedValue <= 0 ? undefined : parsedValue * 100;
  };

  const parsePercentage = (value?: string) => {
    if (!value) return undefined;
    const interestString = parseFloat(value);
    return interestString <= 0 ? undefined : interestString / 100;
  };

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
    }
  }, [config, paymentSchedule]);

  const validateNumber = (text: string): boolean => {
    return text === "" || !isNaN(parseFloat(text));
  };

  const onSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validateNumber(e.target.value)) return;
    setConfig({ ...config, salary: e.target.value });
  };

  const onDebt = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validateNumber(e.target.value)) return;
    setConfig({ ...config, debt: e.target.value });
  };

  const onRepayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validateNumber(e.target.value)) return;
    setConfig({ ...config, repaymentThreshold: e.target.value });
  };

  const onInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validateNumber(e.target.value)) return;
    setConfig({ ...config, interest: e.target.value });
  };

  const onRepaymentPercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validateNumber(e.target.value)) return;
    setConfig({ ...config, repaymentPercentage: e.target.value });
  };

  const selectPlan1Threshold = () => {
    setConfig({ ...config, repaymentThreshold: "19895" });
  };

  const selectPlan2Threshold = () => {
    setConfig({ ...config, repaymentThreshold: "27295" });
  };

  const selectPlan4Threshold = () => {
    setConfig({ ...config, repaymentThreshold: "25000" });
  };

  return (
    <>
      <h2>Your Income &amp; Loan</h2>
      <div>
        <p>Your gross annual salary.</p>
        <TextField
          id="salary"
          label="Salary"
          type="number"
          variant="outlined"
          onChange={onSalary}
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
        <MonthSelector
          initialSelection={paymentSchedule}
          onChange={setPaymentSchedule}
        />
      </div>
      <div>
        <p>
          The outstanding balance of your student. You can find this out{" "}
          <a
            target="_blank"
            href="https://www.gov.uk/sign-in-to-manage-your-student-loan-balance"
          >
            here
          </a>
          .
        </p>
        <TextField
          id="debt"
          label="Loan Balance"
          type="number"
          variant="outlined"
          onChange={onDebt}
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
      </div>
      <div>
        <p>
          This depends on which "Plan" you're on. Check the latest thresholds{" "}
          <a
            target="_blank"
            href="https://www.gov.uk/repaying-your-student-loan/when-you-start-repaying"
          >
            here
          </a>
          .
        </p>
        <TextField
          id="threshold"
          label="Salary Threshold"
          type="number"
          variant="outlined"
          onChange={onRepayment}
          value={config.repaymentThreshold}
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
        <FormHelperText>
          Defaults:{" "}
          <InlineButton onClick={selectPlan1Threshold}>Plan 1</InlineButton>,{" "}
          <InlineButton onClick={selectPlan2Threshold}>Plan 2</InlineButton>,{" "}
          <InlineButton onClick={selectPlan4Threshold}>Plan 4</InlineButton>{" "}
          (these were last checked 10th of Jan 2022)
        </FormHelperText>
      </div>
      <div>
        <p>
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
        </p>
        <TextField
          id="interest"
          label="Interest"
          type="number"
          variant="outlined"
          onChange={onInterest}
          value={config.interest}
          InputProps={{
            // This is a hack to force the label to
            startAdornment: <InputAdornment position="start"></InputAdornment>,

            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </div>
      <div>
        <p>
          This has been 9% for quite some time. Double check this value{" "}
          <a
            target="_blank"
            href="https://www.gov.uk/repaying-your-student-loan/what-you-pay"
          >
            here
          </a>
          .
        </p>
        <TextField
          id="repayment"
          label="Repayment Percentage"
          type="number"
          variant="outlined"
          onChange={onRepaymentPercentage}
          value={config.repaymentPercentage}
          InputProps={{
            // This is a hack to force the label to
            startAdornment: <InputAdornment position="start"></InputAdornment>,

            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </div>
    </>
  );
};

export default ConfigInput;
