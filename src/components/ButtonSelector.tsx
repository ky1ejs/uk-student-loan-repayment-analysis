import React, { Key, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface ButtonSelectorOption<T> {
  key: Key;
  title: string;
  value: T;
}

interface ButtonSelectorProps<T> {
  options: ButtonSelectorOption<T>[];
  onChange: (option: T) => void;
  initialSelection?: T;
}

function ButtonSelector<T>(props: ButtonSelectorProps<T>) {
  const { options, onChange, initialSelection } = props;
  const [selectedValue, setSelectedValue] = useState<T | undefined>(
    initialSelection
  );

  const handleChange = (event: React.MouseEvent<HTMLElement>, selection: T) => {
    if (selection === selectedValue || selection === null) return;
    setSelectedValue(selection);
    onChange(selection);
  };

  const control = {
    value: selectedValue,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <ToggleButtonGroup size="small" {...control}>
      {options.map((o) => (
        <ToggleButton value={o.value} key={o.key}>
          {o.title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ButtonSelector;
