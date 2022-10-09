import React from "react";
import { ReactComponent as EditIcon } from "asset/Launch/Edit.svg";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BusinessAddressCard = () => {
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { businessAddress } = LaunchApplicationInfo.businessAddress;
  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/launch/address");
  };

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>Business Address</Title>
          <EditWrapper>
            <EditIcon onClick={handleNavigate} />
            <EditText>Edit</EditText>
          </EditWrapper>
        </TitleWrapper>
        <Container>
          <LowerContainer>
            <Text>{businessAddress?.addressCountry}</Text>
            <Text>{businessAddress?.addressEmail}</Text>
            {/* <Text>{businessAddress?.addressNumber}</Text> */}
          </LowerContainer>
          <LowerContainer>
            <Text>
              {businessAddress?.addressNumber},{" "}
              <Span>{businessAddress?.addressStreet}</Span>,{" "}
              <Span>{businessAddress?.addressCity}</Span>,{" "}
              <Span>{businessAddress?.addressState}</Span>,{" "}
              <Span>{businessAddress?.addressCountry}</Span>
              <br />
              {businessAddress?.addressZipCode}
            </Text>
          </LowerContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default BusinessAddressCard;
const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const Title = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #151717;
`;
const EditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const EditText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  color: #00a2d4;
`;
const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 32px;
`;
const LowerContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 4px;
`;
const Text = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #4e5152;
`;
const Span = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #4e5152;
`;
