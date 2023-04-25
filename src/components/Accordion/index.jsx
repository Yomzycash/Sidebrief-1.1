import React from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const Accordion = ({ title, type, country, date }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{title}</Title>
        <ArrowDown onClick={() => setIsActive(!isActive)} isActive={isActive}>
          <IoIosArrowDown />
        </ArrowDown>
      </TitleWrapper>
      {isActive && (
        <ContentWrapper>
          <SubContentWrapper>
            <ContentTitle>Type</ContentTitle>
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

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
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
