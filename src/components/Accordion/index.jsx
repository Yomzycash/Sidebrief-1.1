import React from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Accordion = ({ name, type, country, date, code, countryISO, navigate,product, action }) => {
  const launchInfo = {
    launchCode: code,
    registrationCountry: countryISO,
    registrationType: type,
  };


  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  const content = pathname.includes('business');

  return (
    <Wrapper>
      <TitleWrapper onClick={() => setIsActive(!isActive)} isActive={isActive}>
        <Title>{name}</Title>
        <ArrowDown onClick={() => setIsActive(!isActive)} isActive={isActive} >
          <IoIosArrowDown />
        </ArrowDown>
      </TitleWrapper>
      {isActive && (
        <AllContentWrapper>
          <ContentWrapper>
            <SubContentWrapper>
              <ContentTitle>{content? 'Type' : 'Status'}</ContentTitle>
              <SubWrapper>
                <ContentTitle>{type}</ContentTitle>
              </SubWrapper>
            </SubContentWrapper>
            <SubContentWrapper>
              <ContentTitle>Country</ContentTitle>
              <SubWrapper>
                <ContentTitle>{country}</ContentTitle>
              </SubWrapper>
            </SubContentWrapper>
            <SubContentWrapper>
              <ContentTitle>Date</ContentTitle>
              <SubWrapper>
                <ContentTitle>{date}</ContentTitle>
              </SubWrapper>
            </SubContentWrapper>
          </ContentWrapper>

          {!product && 
            <Details onClick={() => navigate(launchInfo)}>More details</Details>
          }
           {product &&
            <Details onClick={action}>More details</Details>}
        </AllContentWrapper>
      )}
    </Wrapper>
  );
};

export default Accordion;

const Wrapper = styled.div`
  box-sizing: border-box;

  width: 100%;
  padding-bottom: 24px;
  padding: 20px;

  border-bottom: 1px solid #edf1f7;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  letter-spacing: -0.01em;

  color: #242627;
`;
const ArrowDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: ${({ isActive }) => (isActive ? "rotate(180deg)" : "")};
  transition: 0.3s transform ease;
  padding: 0 5px;
`;
const AllContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  width: 100%;
`;
const SubContentWrapper = styled.div`
  max-width: 211px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SubWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ContentTitle = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  letter-spacing: -0.01em;

  color: #242627;
`;

const Details = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  text-decoration-line: underline;

  color: #00a2d4;
`;
