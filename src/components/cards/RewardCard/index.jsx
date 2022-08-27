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
import { ReactComponent as ArrowBlueRight } from "asset/svg/arrow-blue-right.svg";

export const RewardCard = ({ image, imageAlt, title, body, action, isBig }) => {
	return (
		<Container isBig={isBig}>
			<Corner>
				<CornerPetal />
			</Corner>
			<Frame>
				{!isBig ? (
					<ImageHolder>
						<img src={image} alt={imageAlt} />
					</ImageHolder>
				) : null}
				<TextContainer isBig={isBig}>
					<Title>{title}</Title>
					<Body>{body}</Body>
				</TextContainer>
			</Frame>
			<StartButton onClick={action}>
				<p>Get started</p>
				<ArrowBlueRight />
			</StartButton>
		</Container>
	);
};
