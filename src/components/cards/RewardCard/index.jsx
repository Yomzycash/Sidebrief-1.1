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
import { ReactComponent as ArrowBlueRight } from "asset/svg/arrow-blue-right.svg";
import { TextWithArrow } from "components/texts";

export const RewardCard = ({ image, imageAlt, title, body, action, isBig }) => {
	return (
		<Container isBig={isBig}>
			<Corner>{isBig ? <CornerPetalDeep /> : <CornerPetal />}</Corner>
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
				<TextWithArrow blue>Get started</TextWithArrow>
			</StartButton>
		</Container>
	);
};
