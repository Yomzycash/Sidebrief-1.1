import React from "react";
import styled from "styled-components";
import awaitingImg from "asset/staff/Awaiting.svg";
import completedImg from "asset/staff/Completed.svg";
import inProgressImg from "asset/staff/InProgress.svg";

const StaffStatusCard = ({ status }) => {
  return (
    <Wrapper>
      <Container>
        <IconWrapper>
          <img src={awaitingImg} alt="icon" />
        </IconWrapper>
        <Number>{status?.awaiting}</Number>
        <TextWrapper>
          <StatusWrapper>Businesses Awaiting Approval</StatusWrapper>
        </TextWrapper>
      </Container>

      <Container>
        <IconWrapper>
          <img src={inProgressImg} alt="icon" />
        </IconWrapper>
        <Number>{status?.inProgress}</Number>
        <TextWrapper>
          <StatusWrapper>Businesses In Progress</StatusWrapper>
        </TextWrapper>
      </Container>

      <Container>
        <IconWrapper>
          <img src={completedImg} alt="icon" />
        </IconWrapper>
        <Number>{status?.completed}</Number>
        <TextWrapper>
          <StatusWrapper>Businesses Completed</StatusWrapper>
        </TextWrapper>
      </Container>
      {/* {StaffBusinessStatus.map((card, index) => {
        return (
          <Container key={index}>
            <IconWrapper>
              <img src={card.image} alt="icon" />
            </IconWrapper>
            <Number>{card.number}</Number>
            <TextWrapper>
              {card.title}
              <StatusWrapper>{card.status}</StatusWrapper>
            </TextWrapper>
          </Container>
        );
      })} */}
    </Wrapper>
  );
};

export default StaffStatusCard;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`;
const Container = styled.div`
  width: 100%;
  height: 168px;
  padding: 24px;

  background: #ffffff;

  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
`;
const IconWrapper = styled.div`
  margin-block-end: 16px;
`;
const Number = styled.h3`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #242627;
  margin-block-end: 8px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #959697;
`;
const StatusWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #959697;
`;
