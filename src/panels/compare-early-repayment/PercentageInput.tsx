import { TextField, InputAdornment } from "@mui/material";
import React from "react";
import HelpTooltipButton from "../../components/HelpTooltipButton";

interface PoundTextFieldProps {
  id: string;
  label: string;
  onChange: (v: string) => void;
  value: string;
  fullWidth?: boolean;
  tooltip?: JSX.Element;
}

const PercentageInput = ({
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
    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    variant="outlined"
    onChange={(e) => onChange(e.target.value)}
    value={value}
    fullWidth={fullWidth}
    InputProps={{
      // This is a hack to force the label to
      startAdornment: <InputAdornment position="start"></InputAdornment>,

      endAdornment: tooltip && (
        <InputAdornment position="end">
          %
          <HelpTooltipButton children={tooltip} />
        </InputAdornment>
      ),
    }}
    sx={fullWidth ? undefined : { width: "120px" }}
  />
);

export default PercentageInput;
