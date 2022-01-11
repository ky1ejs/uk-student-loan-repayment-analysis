import React from "react";
import PaymentSchedule from "../types/PaymentSchedule";
import ButtonSelector from "./ButtonSelector";

interface PaymentScheduleSelectorProps {
  onChange: (s: PaymentSchedule) => void;
  initialSelection?: PaymentSchedule;
}

const MonthSelector = ({
  onChange,
  initialSelection,
}: PaymentScheduleSelectorProps) => {
  return (
    <ButtonSelector
      initialSelection={initialSelection}
      options={[
        { key: "y", title: "Annually", value: PaymentSchedule.Anually },
        { key: "m", title: "Monthly", value: PaymentSchedule.Monthly },
      ]}
      onChange={onChange}
    />
  );
};

export default MonthSelector;
