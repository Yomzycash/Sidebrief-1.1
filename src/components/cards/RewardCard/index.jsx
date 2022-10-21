import React, { useEffect, useRef, useState } from "react";
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
  const [buttonDisplayValue, setButtonDisplayValue] = useState("");

  const buttonRef = useRef();
  useEffect(() => {
    getDisplay();
  }, []);

  const getDisplay = () => {
    window.addEventListener("resize", () => {
      const buttonDisplay = window.getComputedStyle(
        buttonRef.current,
        null
      ).display;
      let display = buttonDisplayValue;
      if (buttonDisplay !== display) {
        display = buttonDisplay;
        setButtonDisplayValue(buttonDisplay);
        console.log(buttonDisplay !== display);
      }
    });
  };

  // console.log(buttonDisplayValue);

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hover={hover}
      onClick={rewardspage && action}
      rewardspage={rewardspage}
    >
      <Corner>
        <CornerPetal />
      </Corner>
      <Frame>
        <ImageHolder>
          <img src={image} alt={imageAlt} />
        </ImageHolder>
        <TextContainer>
          <Title>{title}</Title>
          <Body>{body}</Body>
        </TextContainer>
      </Frame>
      <StartButton onClick={action} hide={rewardspage} ref={buttonRef}>
        <TextWithArrow blue hover={hover}>
          Claim Now
        </TextWithArrow>
      </StartButton>
    </Container>
  );
};
