import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import MonthSelector from "../../components/MonthSelector";
import Section from "../../components/Section";
import InvestmentConfig from "../../types/InvestmentConfig";
import PaymentSchedule from "../../types/PaymentSchedule";

interface InvetmentInputProps {
  didUpdateInvestmentConfig: (config: InvestmentConfig) => void;
}

const InvestmentInput = ({
  didUpdateInvestmentConfig,
}: InvetmentInputProps) => {
  const [paymentSchedule, setPaymentSchedule] = React.useState(
    PaymentSchedule.Monthly
  );
  const [config, setConfig] = React.useState<Partial<InvestmentConfig>>({});

  useEffect(() => {
    if (config.annualInvestment && config.expectedAnnualReturn) {
      didUpdateInvestmentConfig({
        annualInvestment: config.annualInvestment,
        expectedAnnualReturn: config.expectedAnnualReturn,
      });
    }
  }, [config]);

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) * 100;
    const annualInvestment =
      paymentSchedule === PaymentSchedule.Monthly ? value * 12 : value;
    setConfig({ ...config, annualInvestment });
  };

  const handleReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      expectedAnnualReturn: parseFloat(e.target.value) / 100,
    });
  };

  return (
    <Section>
      <h2>Repayments &amp; Return</h2>
      <div>
        <TextField
          label="Repayment"
          variant="outlined"
          onChange={handleInvestmentChange}
        />
        <MonthSelector
          initialSelection={paymentSchedule}
          onChange={setPaymentSchedule}
        />
      </div>
      <div>
        <TextField
          label="Return"
          variant="outlined"
          onChange={handleReturnChange}
        />
      </div>
    </Section>
  );
};

export default InvestmentInput;
