import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-top: 20px;
  height: 135px;
`;
const Center = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

const LightGrey = styled.p`
  color: #9fa1a0;
`;

const GitHubIcon = styled.p`
  padding-top: 6px;

  svg:hover {
    fill: #656766;
  }
`;

const Content = styled.div`
  margin: 0 34px;
  height: 100%;
  text-align: center;

  a {
    text-decoration: none;
  }

  p {
    margin: 0;
  }
`;

const MadeByKyle = () => (
  <p>
    👓 made by <a href="https://twitter.com/kylejm_">kylejm</a>
  </p>
);

const Copyright = () => (
  <LightGrey>
    &copy; Copyright {new Date().getFullYear()} Kyle McAlpine
  </LightGrey>
);

const Code = () => (
  <GitHubIcon>
    <a href="https://github.com/kylejm/uk-student-loan-repayment-analysis">
      <svg height="3ch" width="3ch" viewBox="10 10 30 30" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"
        />
      </svg>
    </a>
  </GitHubIcon>
);

const NotFinancialAdvice = () => (
  <LightGrey>informational purposes only, not financial advice </LightGrey>
);

const Footer = () => (
  <Container>
    <Center>
      <Content>
        <MadeByKyle />
        <NotFinancialAdvice />
        <Copyright />
        <Code />
      </Content>
    </Center>
  </Container>
);

export default Footer;
