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
  CornerMobile,
  CornerDesktop,
} from "./styles";
// import { ReactComponent as CornerPetal } from "asset/svg/cornerPetal.svg";
import { TextWithArrow } from "components/texts";
import { CornerPetal } from "asset/svg";

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
    const buttonDisplay = window.getComputedStyle(
      buttonRef.current,
      null
    ).display;
    if (buttonDisplay !== buttonDisplayValue) {
      setButtonDisplayValue(buttonDisplay);
    }
    if (rewardspage) setButtonDisplayValue("none");
  };

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hover={hover}
      onClick={
        buttonDisplayValue === "none" ? (action ? action : "") : () => {}
      }
      rewardspage={rewardspage}
    >
      <Corner>
        <CornerMobile>
          <CornerPetal viewBox="0 0 50 200" />
        </CornerMobile>
        <CornerDesktop>
          <CornerPetal />
        </CornerDesktop>
      </Corner>
      <Frame>
        <ImageHolder>
          <img src={image} alt={imageAlt} /> || 
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
