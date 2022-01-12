import React, { useEffect } from "react";
import AnnuallyOrMonthlySelector from "../../components/AnnuallyOrMonthlySelector";
import PoundTextField from "../../components/PoundTextField";
import Section from "../../components/Section";
import InvestmentConfig from "../../types/InvestmentConfig";
import AnnuallyOrMonthly from "../../types/AnnuallyOrMonthly";
import {
  stringToPercentage,
  percentageToString,
} from "../../util/parse-percentage";
import { stringToPennies, penniesToString } from "../../util/parse-pound";
import PercentageInput from "./PercentageInput";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  gap: 8px;
`;

const InputRow = styled.div`
  margin: 24px 0;
`;

interface InvestmentConfigInputs {
  investment: string;
  expectedAnnualReturn: string;
  investmentFrequency: AnnuallyOrMonthly;
}

interface InvetmentInputProps {
  didUpdateInvestmentConfig: (config?: InvestmentConfig) => void;
  initialValues: Partial<InvestmentConfig>;
}

const InvestmentInput = ({
  didUpdateInvestmentConfig,
  initialValues,
}: InvetmentInputProps) => {
  const [config, setConfig] = React.useState<InvestmentConfigInputs>({
    investment: penniesToString(initialValues.investment) ?? "",
    expectedAnnualReturn:
      percentageToString(initialValues.expectedAnnualReturn) ?? "",
    investmentFrequency:
      initialValues.investmentFrequency ?? AnnuallyOrMonthly.Monthly,
  });

  useEffect(() => {
    const investment = stringToPennies(config.investment);
    const expectedAnnualReturn = stringToPercentage(
      config.expectedAnnualReturn
    );

    if (investment && expectedAnnualReturn) {
      didUpdateInvestmentConfig({
        investment,
        expectedAnnualReturn,
        investmentFrequency: config.investmentFrequency,
      });
    } else {
      didUpdateInvestmentConfig(undefined);
    }
  }, [config]);

  const handleInvestmentChange = (value: string) => {
    setConfig({ ...config, investment: value });
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
            value={config.investment}
            fullWidth
            onChange={handleInvestmentChange}
          />
          <AnnuallyOrMonthlySelector
            initialSelection={config.investmentFrequency}
            onChange={(investmentFrequency) =>
              setConfig({ ...config, investmentFrequency })
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
    </Section>
  );
};

export default InvestmentInput;
