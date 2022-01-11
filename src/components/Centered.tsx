import React from "react";
import styled from "styled-components";

export const CenteringContainer = styled.div`
  height: 100%;
  display: grid;
`;

export const CenteredContent = styled.div`
  margin: auto;
`;

export const Centered: React.FC = ({ children }) => {
  return (
    <CenteringContainer>
      <CenteredContent>{children}</CenteredContent>
    </CenteringContainer>
  );
};
