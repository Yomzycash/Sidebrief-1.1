import React, { useState } from "react";
import {
  Container,
  StartButton,
  Corner,
  ImageHolder,
  TextContainer,
  Title,
  Body,
  Frame,
} from "./styles";
import { ReactComponent as CornerPetal } from "asset/svg/cornerPetal.svg";
import { ReactComponent as CornerPetalDeep } from "asset/svg/cornerPetalDeep.svg";
import { TextWithArrow } from "components/texts";

export const RewardCard = ({
  image,
  imageAlt,
  title,
  body,
  action,
  rewardspage,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hover={hover}
      onClick={rewardspage && action}
      rewardspage={rewardspage}
    >
      <Corner hover={hover}>
        <CornerPetal />
      </Corner>
      <Frame>
        <ImageHolder>
          <img src={image} alt={imageAlt} />
        </ImageHolder>
        <TextContainer>
          <Title hover={hover}>{title}</Title>
          <Body hover={hover}>{body}</Body>
        </TextContainer>
      </Frame>
      {rewardspage ? (
        ""
      ) : (
        <StartButton onClick={action}>
          <TextWithArrow blue={!hover}>Get started</TextWithArrow>
        </StartButton>
      )}
    </Container>
  );
};
