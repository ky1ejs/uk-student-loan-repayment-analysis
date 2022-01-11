import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import HelpTooltipButton from "./HelpTooltipButton";

interface PoundTextFieldProps {
  id: string;
  label: string;
  onChange: (v: string) => void;
  value: string;
  fullWidth?: boolean;
  tooltip?: React.ReactNode;
  hint?: React.ReactNode
}

const PoundTextField = ({
  id,
  label,
  onChange,
  value,
  fullWidth,
  tooltip,
  hint
}: PoundTextFieldProps) => (
  <TextField
    id={id}
    label={label}
    variant="outlined"
    onChange={(e) => onChange(e.target.value)}
    value={value}
    fullWidth={fullWidth}
    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    helperText={hint}
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
