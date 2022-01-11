import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => (
  <MuiCard sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {children}
    </CardContent>
  </MuiCard>
);

export default Card;
