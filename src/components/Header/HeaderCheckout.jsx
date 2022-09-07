import React from "react";
import styled from "styled-components";
import { ProgressBar } from "components/Indicators";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
const HeaderCheckout = () => {
  const LayoutInfo = useSelector((store) => store.LayoutInfo);
  const { checkoutProgress } = LayoutInfo;

  return (
    <Wrapper>
      <BackContainer>
        <FiArrowLeft color="#151717" size={24} />
        <Text> Back to home</Text>
      </BackContainer>

      <ProgressWrapper>
        <ProgressBar progress={checkoutProgress} />
      </ProgressWrapper>
    </Wrapper>
  );
};

export default HeaderCheckout;

const Wrapper = styled.div`
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #edf1f7;
  display: flex;
  align-items: center;
  height: clamp(90px, 15vw, 164px);
  gap: 40px;
  padding-inline: 8%;
`;

const BackContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
const Text = styled.h3`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #151717;
`;

const ProgressWrapper = styled.div`
  position: relative;
  left: -6%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
