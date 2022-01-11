import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-top: 20px;
  height: 90px;

  @media only screen and (max-width: 800px) {
    height: 130px;
  }
`;

const Center = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

const Content = styled.div`
  margin: 0 34px;
  height: 100%;
  padding-top: 12px;
  border-top: 1px solid #a3a3a3;

  a {
    text-decoration: none;
  }
`;

const RightText = styled.p`
  margin: 0;
  float: right;
`;

const LeftText = styled.p`
  margin: 0;
  float: left;
`;

const Desktop = styled.div`
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const Mobile = styled.div`
  @media only screen and (min-width: 801px) {
    display: none;
  }
`;

const MadeByKyle = () => (
  <>
    👓 made by <a href="https://twitter.com/kylejm_">kylejm</a>
  </>
);

const Copyright = () => (
  <>&copy; Copyright {new Date().getFullYear()} Kyle McAlpine</>
);

const Code = () => (
  <>
    👩‍💻 view source code and contribute{" "}
    <a href="https://github.com/kylejm/uk-student-loan-repayment-analysis">
      on GitHub
    </a>
  </>
);

const NotFinancialAdvice = () => (
  <>⚠️ informational purposes only, not financial advice </>
);

const MobileFooter = () => (
  <Mobile>
    <MadeByKyle />
    <br />
    <NotFinancialAdvice />
    <br />
    <Code />
    <br />
    <Copyright />
  </Mobile>
);

const DesktopFooter = () => (
  <Desktop>
    <>
      <LeftText>
        <MadeByKyle />
      </LeftText>
      <RightText>
        <NotFinancialAdvice />
      </RightText>
      <br />
    </>
    <>
      <LeftText>
        <Code />
      </LeftText>
      <RightText>
        <Copyright />
      </RightText>
    </>
  </Desktop>
);

const Footer = () => (
  <Container>
    <Center>
      <Content>
        <DesktopFooter />
        <MobileFooter />
      </Content>
    </Center>
  </Container>
);

export default Footer;
