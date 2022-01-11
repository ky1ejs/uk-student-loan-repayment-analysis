import React, { useEffect } from "react";
import MonthSelector from "../../components/MonthSelector";
import PoundTextField from "../../components/PoundTextField";
import Section from "../../components/Section";
import InvestmentConfig from "../../types/InvestmentConfig";
import PaymentSchedule from "../../types/PaymentSchedule";
import parsePercentage from "../../util/parse-percentage";
import parsePound from "../../util/parse-pound";
import PercentageInput from "./PercentageInput";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  gap: 8px;
`;

const InputRow = styled.div`
  margin: 24px 0;
`;

interface InvetmentInputProps {
  didUpdateInvestmentConfig: (config?: InvestmentConfig) => void;
}

interface InvestmentConfigInputs {
  annualInvestment: string;
  expectedAnnualReturn: string;
}

const InvestmentInput = ({
  didUpdateInvestmentConfig,
}: InvetmentInputProps) => {
  const [paymentSchedule, setPaymentSchedule] = React.useState(
    PaymentSchedule.Monthly
  );
  const [config, setConfig] = React.useState<InvestmentConfigInputs>({
    annualInvestment: "",
    expectedAnnualReturn: "",
  });

  useEffect(() => {
    const annualInvestment = parsePound(config.annualInvestment);
    const expectedAnnualReturn = parsePercentage(config.expectedAnnualReturn);

    if (annualInvestment && expectedAnnualReturn) {
      didUpdateInvestmentConfig({
        annualInvestment: annualInvestment,
        expectedAnnualReturn: expectedAnnualReturn,
      });
    } else {
      didUpdateInvestmentConfig(undefined);
    }
  }, [config, paymentSchedule]);

  const handleInvestmentChange = (value: string) => {
    setConfig({ ...config, annualInvestment: value });
  };

  const handleReturnChange = (value: string) => {
    setConfig({ ...config, expectedAnnualReturn: value });
  };

  return (
    <Section>
      <h2>Repayments &amp; Return</h2>
      <InputRow>
        <Flex>
          <PoundTextField
            id="repayment"
            label="Repayment"
            value={config.annualInvestment}
            onChange={handleInvestmentChange}
          />
          <MonthSelector
            initialSelection={paymentSchedule}
            onChange={setPaymentSchedule}
          />
        </Flex>
      </InputRow>
      <InputRow>
        <PercentageInput
          id="return"
          label="Return"
          value={config.expectedAnnualReturn}
          onChange={handleReturnChange}
          fullWidth
        />
      </InputRow>
    </Section>
  );
};

export default InvestmentInput;
