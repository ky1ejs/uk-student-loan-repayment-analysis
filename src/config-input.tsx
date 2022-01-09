import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Config } from "./analysis";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const ConfigInput = ({ onConfigSet }: { onConfigSet: (c: Config) => void }) => {
  const [config, setConfig] = useState<Partial<Config>>({});
  useEffect(() => {
    if (
      config.debt &&
      config.interest &&
      config.repaymentThreshold &&
      config.salary
    ) {
      onConfigSet({
        debt: config.debt,
        salary: config.salary,
        repaymentThreshold: config.repaymentThreshold,
        interest: config.interest,
      });
    }
  }, [config]);

  const onSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, salary: parseFloat(e.target.value) * 100 });
  };
  const onDebt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, debt: parseFloat(e.target.value) * 100 });
  };
  const onRepayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      repaymentThreshold: parseFloat(e.target.value) * 100,
    });
  };
  const onInterest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, interest: parseFloat(e.target.value) });
  };

  return (
    <>
      <h2>Config</h2>
      <InputContainer>
        <TextField
          id="salary"
          label="Salary"
          variant="outlined"
          onChange={onSalary}
        />
        <TextField
          id="debt"
          label="Loan Balance"
          variant="outlined"
          onChange={onDebt}
        />
        <TextField
          id="repayment"
          label="Salary"
          variant="outlined"
          onChange={onRepayment}
        />
        <TextField
          id="interest"
          label="Interest"
          variant="outlined"
          onChange={onInterest}
        />
      </InputContainer>
    </>
  );
};

export default ConfigInput;
