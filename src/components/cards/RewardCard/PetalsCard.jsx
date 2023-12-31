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
  Message,
  Badge,
  CategoryName,
} from "./styles";
// import { ReactComponent as CornerPetal } from "asset/svg/cornerPetal.svg";
import { TextWithArrow } from "components/texts";
import { CornerPetal } from "asset/svg";

const PetalsCard = ({
  image,
  title,
  subText,
  message,
  badge,
  categoryName,
  countryName,
  showClaim,
  action,
  service,
}) => {
  const [hover, setHover] = useState(false);
  const [buttonDisplayValue, setButtonDisplayValue] = useState("");

  const buttonRef = useRef();
  useEffect(() => {
    getDisplay();
  }, []);

  const getDisplay = () => {
    const buttonDisplay = window.getComputedStyle(buttonRef.current, null).display;
    if (buttonDisplay !== buttonDisplayValue) {
      setButtonDisplayValue(buttonDisplay);
    }
    if (!showClaim) setButtonDisplayValue("none");
  };

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      hover={hover}
      onClick={buttonDisplayValue === "none" ? (action ? action : () => {}) : () => {}}
      rewardspage={!showClaim}
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
        {badge && <Badge>{badge}</Badge>}
        {/* {image && (
          <ImageHolder>
            <img src={image} alt={title} />
          </ImageHolder>
        )} */}
        {service ? (
          <CategoryName>{categoryName}</CategoryName>
        ) : (
          <ImageHolder>
            <img src={image} alt={title} />
          </ImageHolder>
        )}

        <TextContainer>
          {title && <Title>{title}</Title>}
          {message && <Message>{message}</Message>}
          {subText && <Body>{subText}</Body>}
        </TextContainer>
      </Frame>
      <StartButton onClick={action} hide={!showClaim} ref={buttonRef}>
        <TextWithArrow blue hover={hover}>
          Claim Now
        </TextWithArrow>
      </StartButton>
    </Container>
  );
};

export default PetalsCard;
