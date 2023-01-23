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
} from "./styles";
import { ReactComponent as CornerPetal } from "asset/svg/cornerPetal.svg";
import { ReactComponent as Mark } from "asset/svg/mark.svg";
import numeral from "numeral";

export const EntityCard = ({
  action,
  name,
  price,
  timeline,
  requirement,
  shares,
  type,
  currency,
  description,
}) => {
  return (
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
          {numeral(price).format("0,0")} {currency}
        </Price>
      </Mid>

      <Bottom>
        {/* <Bullet>
          <Mark /> <Content>{company}</Content>
        </Bullet> */}
        <Bullet>
          <Mark /> <Content>{type} Company</Content>
        </Bullet>
        <Bullet>
          <Mark /> <Content>{shares} shares</Content>
        </Bullet>
        <Bullet>
          <Mark /> <Content>{requirement}</Content>
        </Bullet>
      </Bottom>
    </Container>
  );
};

export { Wrapper as EntityWrapper } from "./wrapper";
