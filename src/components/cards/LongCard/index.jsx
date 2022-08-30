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
	notReady, // used to determine if button should be disabled or not
	action, // function for action that should be performed on button click
}) => {
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
				<LongButton
					notReady={notReady}
					onClick={action}
					disabled={notReady}
				>
					{/* <p>{!notReady ? "Get Started" : "Coming soon"}</p>
					<ArrowWhiteRight /> */}
					<TextWithArrow>
						{!notReady ? "Get Started" : "Coming soon"}
					</TextWithArrow>
				</LongButton>
			</ButtonWrapper>
		</Container>
	);
};
