import React, { useState } from "react";
import { Help } from "@mui/icons-material";
import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";

const HelpTooltipButton = ({ children }: { children?: JSX.Element }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <IconButton
        aria-label="toggle password visibility"
        edge="end"
        onClick={() => setTooltipOpen(!tooltipOpen)}
      >
        <Tooltip
          arrow
          open={tooltipOpen}
          title={<React.Fragment>{children}</React.Fragment>}
        >
          <Help />
        </Tooltip>
      </IconButton>
    </ClickAwayListener>
  );
};

export default HelpTooltipButton;
