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

export const LongCard = ({ title, body, notReady }) => {
	return (
		<Container>
			<FirstPart>
				<IconWrapper>
					<Case />
				</IconWrapper>
				<MiddlePart>
					<Title>{title}</Title>
					<Body>{body}</Body>
				</MiddlePart>
			</FirstPart>
			<ButtonWrapper>
				<LongButton notReady={notReady}>
					<p>{!notReady ? "Get Started" : "Coming soon"}</p>
					<ArrowWhiteRight />
				</LongButton>
			</ButtonWrapper>
		</Container>
	);
};
