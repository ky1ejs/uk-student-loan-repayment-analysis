import React from "react";
import styled from "styled-components";
import { Centered } from "../../components/Centered";

const Container = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 5px;
  background-color: #f7f7f7;
  box-shadow: 2px 4px 8px #e8e8e8;
`;

const ResultsPlaceholder = () => (
  <Container>
    <Centered>
      Input your investment information above to see the results!
    </Centered>
  </Container>
);

export default ResultsPlaceholder;
