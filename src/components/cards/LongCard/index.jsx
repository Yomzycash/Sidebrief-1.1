import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  IconWrapper,
  MiddlePart,
  ButtonWrapper,
  LongButton,
  FirstPart,
  Title,
  Body,
} from "./styles";
import { ReactComponent as Case } from "asset/svg/briefCase.svg";
import { ReactComponent as ArrowWhiteRight } from "asset/svg/arrow-white-right.svg";
import { TextWithArrow } from "components/texts";
import { useNavigate } from "react-router-dom";

export const LongCard = ({
  title,
  body,
  notready, // used to determine if button should be disabled or not (value should be 'true' or 'false')
  action,
  type,
  code,
  countryISO
   // function for action that should be performed on button click
}) => {
  const navigate = useNavigate();
	const launchInfo = {
		launchCode: code,
		registrationCountry: countryISO,
		registrationType: type,
	};

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
  };

  return (
    <Container
      notready={notready}
      onClick={() =>
        notready !== "true" && buttonDisplayValue === "none" ? action() : ""
      }
    >
      <FirstPart>
        <IconWrapper notready={notready}>
          <Case fill={`${notready === "true" ? "#ED4E3A" : "#00a2d4"}`} />
        </IconWrapper>
        <MiddlePart>
          <Title>
            {title} {notready && <span> Coming soon</span>}
          </Title>
          <Body>{body}</Body>
        </MiddlePart>
      </FirstPart>
      <ButtonWrapper ref={buttonRef}>
        <LongButton
          notready={notready}
          onClick={action}
          disabled={notready === "true"}
        >
          <TextWithArrow>
            {!notready ? "Get Started" : "Coming soon"}
          </TextWithArrow>
        </LongButton>
      </ButtonWrapper>
    </Container>
  );
};

export { Wrapper as LongCardWrapper } from "./wrapper";
