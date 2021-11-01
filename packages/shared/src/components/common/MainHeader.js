import React from 'react';
import styled from 'styled-components';
import { IntroButtons } from '../../components';
import { useGraphQL } from "../../graphql";
import Img from "gatsby-image"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(180deg, #ffffff 34.93%, #e8f1ff 145.37%, #ebf2ff 145.39%);
  margin: -54px -60px 0 -60px;
  padding: 54px 60px;
  overflow: hidden;
  h1 {
    font-style: normal;
    font-weight: 600 !important;
    font-size: 54px;
    line-height: 72px;
    letter-spacing: -0.02em;
    margin: 24px 0 !important;
    color: #0d1440;
    text-align: left;
  }
  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 48px;
    letter-spacing: 0.25px;
    margin-bottom: 19px !important;
    margin-top: 0px !important;
    color: #2d2e55;
    text-align: left;
  }

  a {
    color: inherit !important;
  }

  span {
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    text-align: left;
    color: #666a80;
    margin-bottom: 32px;
  }

  @media (max-width: 952px) {
    padding: 45px;
    flex-direction: column;
  }

  @media (max-width: 400px) {
    height: 600px;
    padding: 45px;
  }
`;
const LeftSide = styled.div`
  max-width: 450px;
  margin-right: -50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 952px) {
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 100%;
    margin-right: 0;
    padding: 40px;

    h1,
    span,
    h3 {
      text-align: center;
    }
  }
`;
const RightSide = styled.div``;
const Hero = styled.img``;

function MainHeader({ children, introductionHref, demoHref }) {
  const pageContext = useGraphQL();

  return (
    <Wrapper>
      <LeftSide>
        {children}
        <IntroButtons introductionHref={introductionHref} demoHref={demoHref} />
      </LeftSide>
      <RightSide>
        <Img fixed={pageContext.hero.childImageSharp.fixed} />
      </RightSide>
    </Wrapper>
  );
}

export default MainHeader;
