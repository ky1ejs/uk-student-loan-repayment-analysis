import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import HelpTooltipButton from "./HelpTooltipButton";

interface PoundTextFieldProps {
  id: string;
  label: string;
  onChange: (v: string) => void;
  value: string;
  fullWidth?: boolean;
  tooltip?: JSX.Element;
}

const PoundTextField = ({
  id,
  label,
  onChange,
  value,
  fullWidth,
  tooltip,
}: PoundTextFieldProps) => (
  <TextField
    id={id}
    label={label}
    variant="outlined"
    onChange={(e) => onChange(e.target.value)}
    value={value}
    fullWidth={fullWidth}
    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    InputProps={{
      startAdornment: <InputAdornment position="start">£</InputAdornment>,
      endAdornment: tooltip && (
        <InputAdornment position="end">
          <HelpTooltipButton children={tooltip} />
        </InputAdornment>
      ),
    }}
    sx={fullWidth ? undefined : { width: "120px" }}
  />
);

export default PoundTextField;
