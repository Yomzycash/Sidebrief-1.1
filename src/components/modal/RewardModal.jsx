import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Lendha } from "asset/images/lendha.svg";
import { ReactComponent as Close } from "asset/images/close.svg";
import { ReactComponent as Copy } from "asset/images/copy.svg";
import Button from "components/button/mainButton/index.jsx";
import { useParams } from "react-router-dom";
import { allRewards } from "utils/config";
const RewardModal = ({ handleClose }) => {
  const [successful, setSuccessful] = useState(false);

  const { rewardID } = useParams();

  const rewardDetails = allRewards.find(
    (element) => element.title === rewardID
  );

  return (
    <Wrapper>
      <LogoCancelWrapper>
        <LogoWrapper>
          {/* <img src={rewardDetails.image} alt="" /> */}
          <LogoName>{rewardID}</LogoName>
        </LogoWrapper>
        <Close onClick={handleClose} style={{ cursor: "pointer" }} />
      </LogoCancelWrapper>

      {successful && (
        <MiddleContainer>
          <Content>Your reward has been redeemed successfully!</Content>
        </MiddleContainer>
      )}
      <LowerContainer>
        <TextContainer>
          <UpperText>
            $200 off 1st-month subscription for payroll compliance.{" "}
          </UpperText>
          <LowerText>
            Please redeem this reward by inputting the code below on the
            checkout page.
          </LowerText>
        </TextContainer>
        <CopyContainer>
          <CopyDetails>SIDEBRIEFPROMO</CopyDetails>
          <Copy />
        </CopyContainer>
        <Button
          title="Claim Reward"
          onClick={() => setSuccessful(true)}
          style={{ width: "171px", height: "44px" }}
        />
      </LowerContainer>
    </Wrapper>
  );
};

export default RewardModal;

const Wrapper = styled.div`
  max-width: 448px;
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
`;
const LogoCancelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalClose = styled.div`
  width: 24px;
  height: 24px;
`;
const LogoName = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #151717;
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
`;
const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 24px;
  gap: 8px;
  background: rgba(0, 212, 72, 0.1);
  border-radius: 8px;
  margin-bottom: 40px;
`;
const Content = styled.h4`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #00d448;
`;
const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  width: inherit;
`;
const UpperText = styled.h3`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.5px;
  color: #151717;
`;
const LowerText = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #4e5152;
`;
const CopyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  gap: 8px;
  border: 1px dashed #727474;
  border-radius: 8px;
`;
const CopyDetails = styled.h4`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #151717;
`;
