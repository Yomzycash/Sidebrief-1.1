import React from "react";
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

export const LongCard = ({
  title,
  body,
  notready, // used to determine if button should be disabled or not (value should be 'true' or 'false')
  action, // function for action that should be performed on button click
}) => {
  return (
    <Container notready={notready}>
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
      <ButtonWrapper>
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
