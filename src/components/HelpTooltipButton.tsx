import React, { useState } from "react";
import { Help } from "@mui/icons-material";
import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  a:visited { 
    color: wheat;
  }
`

const HelpTooltipButton = ({ children }: { children?: React.ReactNode }) => {
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
          title={<Container>{children}</Container>}
        >
          <Help />
        </Tooltip>
      </IconButton>
    </ClickAwayListener>
  );
};

export default HelpTooltipButton;
