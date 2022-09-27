import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ProgressBar } from "components/Indicators";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
const HeaderCheckout = () => {
  const LayoutInfo = useSelector((store) => store.LayoutInfo);
  const { checkoutProgress } = LayoutInfo;

  const [headerShadow, setHeaderShadow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setHeaderShadow(window.pageXOffset > 0 ? true : false);
    });
  }, []);
  return (
    <Wrapper headerShadow={headerShadow}>
      <BackContainer>
        <FiArrowLeft color="#151717" size={24} />
        <Text>Save & Exit</Text>
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
  gap: 12%;
  position: sticky;
  z-index: 4;
  top: 0;
  padding-inline: 8%;
  box-shadow: ${(props) =>
    props.headerShadow === true ? "0px 10px 15px -5px #9596971a" : null};
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
