import React from "react";
import {
  Container,
  Corner,
  Top,
  Title,
  TimeLine,
  Bottom,
  Mid,
  Price,
  Bullet,
  Content,
  TopText,
  Wrap,
  TopTextWrapper,
  Description,
  FeatureListItem,
} from "./styles";
import { ReactComponent as CornerPetal } from "asset/svg/cornerPetal.svg";
import { ReactComponent as Mark } from "asset/svg/mark.svg";
import numeral from "numeral";
import { getCurrencyInfo } from "utils/globalFunctions";

export const EntityCard = ({
  action,
  name,
  price,
  timeline,
  requirement,
  shares,
  type,
  country,
  features,
  currency,
  description,
}) => {
  return (
    <Wrap>
      {name === "Pro" && (
        <TopTextWrapper>
          <TopText>Popular</TopText>
        </TopTextWrapper>
      )}

      <Container
        onClick={action}
        gap={"24px"}
        // content={"space-between"}
        height={"clamp(450px, 30vw, 500px)"}
      >
        <Corner>
          <CornerPetal />
        </Corner>

        <Top>
          <Title>{name}</Title>
          <TimeLine>{timeline}</TimeLine>
        </Top>
        <Description>{description}</Description>
        <Mid>
          <Price>
            {getCurrencyInfo(currency)?.symbol}
            {numeral(price).format("0,0")}
          </Price>
        </Mid>
        <Bottom>
          <Bullet>
            <Mark /> <Content>{type} Company</Content>
          </Bullet>
          <Bullet>
            <Mark /> <Content>{shares} shares</Content>
          </Bullet>
          <Bullet>
            <Mark /> <Content>{requirement}</Content>
          </Bullet>
          {features?.map((item, index) => (
            <Bullet key={index}>
              <Mark /> <Content>{item}</Content>
            </Bullet>
          ))}
        </Bottom>
      </Container>
    </Wrap>
  );
};

export { Wrapper as EntityWrapper } from "./wrapper";

//  {
//    country === "NGA" ? (
//      <Bullet flow="column">
//        <>
//          {features?.map((item, index) => (
//            <FeatureListItem key={index}>
//              <Mark /> <Content>{item}</Content>
//            </FeatureListItem>
//          ))}
//        </>
//      </Bullet>
//    ) : (
//      <>
//        <Bullet>
//          <Mark /> <Content>{type} Company</Content>
//        </Bullet>
//        <Bullet>
//          <Mark /> <Content>{shares} shares</Content>
//        </Bullet>
//        <Bullet>
//          <Mark /> <Content>{requirement}</Content>
//        </Bullet>
//      </>
//    );
//  }
