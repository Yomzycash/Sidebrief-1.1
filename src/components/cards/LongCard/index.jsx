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
import { TextWithArrow } from "components/texts";

export const LongCard = ({
	title,
	body,
	notReady, // used to determine if button should be disabled or not
	action, // function for action that should be performed on button click
}) => {
	const onClick = () => {
		if (!notReady) {
			action();
		}
	};

	return (
		<Container onClick={onClick} isReady={!notReady}>
			<FirstPart>
				<IconWrapper>
					<Case />
				</IconWrapper>
				<MiddlePart>
					<Title>{title}</Title>
					<Body notReady={notReady}>{body}</Body>
				</MiddlePart>
			</FirstPart>
			<ButtonWrapper>
				<LongButton
					notReady={notReady}
					onClick={onClick}
					disabled={notReady}
				>
					<TextWithArrow>
						{!notReady ? "Get Started" : "Coming soon"}
					</TextWithArrow>
				</LongButton>
			</ButtonWrapper>
		</Container>
	);
};

export { Wrapper as LongCardWrapper } from "./wrapper";
