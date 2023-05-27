import { CommonButton } from "components/button";
import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FeatureDetailsHeader = ({
  backText,
  backURL,
  title,
  description,
  buttonText,
  buttonAction,
}) => {
  return (
    <Container>
      <Top>
        <Back to={backURL}>
          <MdKeyboardBackspace /> {backText}
        </Back>
      </Top>
      <Main>
        <MainLeft>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </MainLeft>
        <MainRight>
          <CommonButton action={buttonAction} text={buttonText} />
        </MainRight>
      </Main>
    </Container>
  );
};

export default FeatureDetailsHeader;

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 30px;
`;
export const Top = styled.div``;

export const Back = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;

  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-decoration: none;
  color: #242627;
`;

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
`;

export const MainLeft = styled.div`
  display: flex;
  flex-flow: column;
  gap: 11px;
`;

export const Title = styled.p`
  ont-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #242627;
`;

export const Description = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #727474;
`;

export const MainRight = styled.div``;
export const Button = styled.div``;
