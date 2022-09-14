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
} from "./styles";
import { ReactComponent as CornerPetal } from "asset/svg/cornerPetal.svg";
import { ReactComponent as Mark } from "asset/svg/mark.svg";
import numeral from "numeral";

export const EntityCard = ({
  action,
  name,
  price,
  shortname,
  company,
  timeline,
  shareholder,
  shares,
  type,
}) => {
  return (
    <Container onClick={action}>
      <Corner>
        <CornerPetal />
      </Corner>
      <Top>
        <Title>
          {name} {shortname && " - " + shortname}
        </Title>
        <TimeLine>
          {timeline.from} - {timeline.to} Days
        </TimeLine>
      </Top>
      <Mid>
        <Price>N{numeral(price).format("0,0")}</Price>
      </Mid>
      <Bottom>
        <Bullet>
          <Mark /> <Content>{company}</Content>
        </Bullet>
        <Bullet>
          <Mark /> <Content>{shareholder}</Content>
        </Bullet>
        <Bullet>
          <Mark /> <Content>{shares} shares</Content>
        </Bullet>
        <Bullet>
          <Mark /> <Content>{type}</Content>
        </Bullet>
      </Bottom>
    </Container>
  );
};

export { Wrapper as EntityWrapper } from "./wrapper";
