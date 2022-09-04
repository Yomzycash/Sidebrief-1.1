import React from "react";
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

export const RewardCard = ({ image, imageAlt, title, body, action }) => {
	return (
		<Container>
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
			<StartButton onClick={action}>
				<TextWithArrow blue>Get started</TextWithArrow>
			</StartButton>
		</Container>
	);
};
