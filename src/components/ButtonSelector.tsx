import React, { Key, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";

interface ButtonSelectorOption<T> {
  key: Key | null | undefined
  title: string;
  value: T;
}

interface ButtonSelectorProps<T> {
  options: ButtonSelectorOption<T>[];
  onChange: (option: ButtonSelectorOption<T>) => void;
  initialValue?: T
}

function ButtonSelector<T>(props: ButtonSelectorProps<T>) {
  const {options, onChange, initialValue} = props;

  const [selectedValue, setSelectedValue] = useState<T | undefined>(initialValue);

  const updateSelected = (option: ButtonSelectorOption<T>) => {
    setSelectedValue(option.value);
    onChange(option);
  };

  return (
    <ButtonGroup>
      {options.map(o => (
        <Button
          key={o.key}
          variant={o.value === selectedValue ? "contained" : "outlined"}
          onClick={() => {
            updateSelected(o);
          }}
        >{o.title}</Button>
      ))}
    </ButtonGroup>
  );
};

export default ButtonSelector;
