import React from "react";
import AnnuallyOrMonthlySelector from "../../components/AnnuallyOrMonthlySelector";
import PoundTextField from "../../components/PoundTextField";
import Section from "../../components/Section";
import PercentageInput from "./PercentageInput";
import styled from "styled-components";
import { Checkbox, FormControlLabel } from "@mui/material";
import HelpTooltipButton from "../../components/HelpTooltipButton";
import InvestmentConfigInput from "../../types/InvestmentInput";

const Flex = styled.div`
  display: flex;
  gap: 8px;
`;

const InputRow = styled.div`
  margin: 24px 0;
`;

interface InvetmentInputProps {
  didUpdateInvestmentConfig: (config: InvestmentConfigInput) => void;
  investmentConfigInput: InvestmentConfigInput;
}

const InvestmentInput = ({
  didUpdateInvestmentConfig,
  investmentConfigInput: config,
}: InvetmentInputProps) => {
  const handleInvestmentChange = (value: string) => {
    didUpdateInvestmentConfig({ ...config, investment: value });
  };

  const handleReturnChange = (value: string) => {
    didUpdateInvestmentConfig({ ...config, expectedAnnualReturn: value });
  };

  return (
    <Section>
      <h2>Repayments &amp; Return</h2>
      <InputRow>
        <Flex>
          <PoundTextField
            id="repayment"
            label="Repayment"
            value={config.investment}
            fullWidth
            onChange={handleInvestmentChange}
          />
          <AnnuallyOrMonthlySelector
            initialSelection={config.investmentFrequency}
            onChange={(investmentFrequency) =>
              didUpdateInvestmentConfig({ ...config, investmentFrequency })
            }
          />
        </Flex>
      </InputRow>
      <InputRow>
        <PercentageInput
          id="return"
          label="Return (YoY)"
          value={config.expectedAnnualReturn}
          onChange={handleReturnChange}
          fullWidth
        />
      </InputRow>
      <FormControlLabel
        control={
          <Checkbox
            checked={config.investLoanPayments}
            onChange={(e, checked) =>
              didUpdateInvestmentConfig({
                ...config,
                investLoanPayments: checked,
              })
            }
          />
        }
        label="Invest loan repayments after loan is repayed"
      />
      <HelpTooltipButton>
        If checked, we'll add your loan repayments to your investment deposit
        once your loan is fully repaid. In other words, when you've finished
        repaying your loan, would you like to invest the money you were paying
        to your loan?
      </HelpTooltipButton>
    </Section>
  );
};

export default InvestmentInput;
