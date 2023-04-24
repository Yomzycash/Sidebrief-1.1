import { CornerPetal } from "asset/svg";
import { EntityTitle } from "pages/Launch/styled";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as MoreIcon } from "../../../../src/asset/svg/threeDot.svg";

const StaffEntityCard = ({
  entityName = "Public Limited Company  (P.L.C)",
  shareholderType = "Local and Foreign Shareholders",
  entityTimeline = "30 days",
  entityType = "Public Limited",
  countryCode = "NGA",
  entityPackage = "Standard",
  clickAction,
}) => {
  // const [open, setOpen] = useState(false);

  return (
    <Container onClick={clickAction ? clickAction : () => {}}>
      <Corner>
        <CornerPetal viewBox="0 0 70 140" />
      </Corner>
      <TopMidContainer>
        <Top>
          <TopHeading>{entityName}</TopHeading>
          <SideContainer>
            <EntityTimeline>{entityTimeline}</EntityTimeline>
            <MoreIconWrapper>
              <MoreIcon />
            </MoreIconWrapper>
          </SideContainer>
        </Top>
        <ShareholderType>{shareholderType}</ShareholderType>
      </TopMidContainer>
      <BottomContainer>
        <BottomWrapper>
          <TextWrapper>{entityType}</TextWrapper>
        </BottomWrapper>
        <BottomWrapper>
          <TextWrapper>{countryCode}</TextWrapper>
        </BottomWrapper>
        <TextWrapper>{entityPackage}</TextWrapper>
      </BottomContainer>
    </Container>
  );
};

export default StaffEntityCard;
const Container = styled.div`
  cursor: pointer;
  max-width: 526px;
  width: 100%;
  min-height: 159px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 24px;
  transition: all 0.2s;
  position: relative;
  background: #ffffff;
  padding: 24px;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  &:hover {
    background: #00a2d4;
  }
`;
const Corner = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotateX(180deg);

  svg {
    ellipse {
      fill: rgba(204, 243, 255, 0.48);
      fill-opacity: 1;
    }
  }
  svg {
    ellipse {
      fill: rgba(204, 243, 255, 0.48);
      fill-opacity: 1;
    }
  }

  ${Container}:hover & {
    svg {
      ellipse {
        fill: #ffffffa3;
      }
    }
  }
  ${Container}:hover & {
    svg {
      ellipse {
        fill: rgba(255, 255, 255, 0.64);
      }
    }
  }
`;
const TopMidContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 8px;
`;
const Top = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SideContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const EntityTimeline = styled.h5`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  text-align: right;

  color: #4e5152;
`;
const TopHeading = styled.h3`
  font-weight: 600;
  font-size: 20px;
  line-height: 21px;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: ${({ theme }) => theme.grey1};
`;

const MoreIconWrapper = styled.div`
  position: relative;
`;

const Options = styled.div`
  position: absolute;
  right: 25px;
  top: -7px;
  background-color: #e0feff;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;

  p {
    :nth-of-type(1) {
      color: red;
    }
  }

  ::before {
    position: absolute;
    top: 10px;
    left: 100%;
    content: "";
    border-width: 8px;
    border-color: transparent transparent transparent #e0feff;
    border-style: solid;
  }
`;

const ShareholderType = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #4e5152;
`;
const BottomContainer = styled.div`
  display: inline-flex;
  align-items: center;

  gap: 16px;
`;
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px 0px 0px;
  gap: 8px;
  border-right: 1px solid #edf1f7;
`;
const TextWrapper = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #4e5152;
`;
