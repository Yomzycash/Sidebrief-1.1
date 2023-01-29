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
  Description,
  TopText,
  Wrap,
  TopTextWrapper,
  FeatureList,
  FeatureListItem,
} from "./styles";
import { ReactComponent as CornerPetal } from "asset/svg/cornerPetal.svg";
import { ReactComponent as Mark } from "asset/svg/mark.svg";
import numeral from "numeral";

const NewEntityCard = ({
  action,
  name,
  price,
  timeline,
  requirement,
  shares,
  features,
  type,
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

      <Container onClick={action}>
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
            {name === "Basic" ? "FREE" : numeral(price).format("0,0")}
            {name === "Basic" ? "" : currency}
          </Price>
        </Mid>

        <Bottom>
          <Bullet flow="column">
            <>
              {features?.map((item) => (
                <FeatureListItem>
                  <Mark /> <Content>{item}</Content>
                </FeatureListItem>
              ))}
            </>
          </Bullet>
          {/* <Bullet>
            <Mark /> <Content>{type} Company</Content>
          </Bullet>
          <Bullet>
            <Mark /> <Content>{shares} shares</Content>
          </Bullet>
          <Bullet>
            <Mark /> <Content>{requirement}</Content>
          </Bullet> */}
          {/* <FeatureList>
            {features?.map((item) => (
              <FeatureListItem>{item}</FeatureListItem>
            ))}
          </FeatureList> */}
        </Bottom>
      </Container>
    </Wrap>
  );
};
export default NewEntityCard;
