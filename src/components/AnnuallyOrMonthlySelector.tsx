import React from "react";
import AnnuallyOrMonthly from "../types/AnnuallyOrMonthly";
import ButtonSelector from "./ButtonSelector";

interface PaymentScheduleSelectorProps {
  onChange: (s: AnnuallyOrMonthly) => void;
  initialSelection?: AnnuallyOrMonthly;
}

const AnnuallyOrMonthlySelector = ({
  onChange,
  initialSelection,
}: PaymentScheduleSelectorProps) => {
  return (
    <ButtonSelector
      initialSelection={initialSelection}
      options={[
        { key: "y", title: "Annually", value: AnnuallyOrMonthly.Anually },
        { key: "m", title: "Monthly", value: AnnuallyOrMonthly.Monthly },
      ]}
      onChange={onChange}
    />
  );
};

export default AnnuallyOrMonthlySelector;
