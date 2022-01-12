import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface CardProps {
  title: string;
  children?: React.ReactNode;
  bgColor: string;
}

const StyledMuiCard = styled(MuiCard)`
  min-width: 275px;

  @media only screen and (min-width: 701px) {
    flex-grow: 1;
    flex-basis: 0;
  }
`;

const StyledCardContent = styled(CardContent)<{ bgcolor: string }>`
  background-color: ${(props) => props.bgcolor};
`;

const Card = ({ title, children, bgColor }: CardProps) => (
  <StyledMuiCard>
    <StyledCardContent bgcolor={bgColor}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {children}
    </StyledCardContent>
  </StyledMuiCard>
);

export default Card;
