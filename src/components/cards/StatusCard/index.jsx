import React from "react";
import {
	Container,
	TextContainer,
	ThreeDotContainer,
	Name,
	Status,
} from "./styles";
import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";
import { StatusIndicator } from "components/Indicators";

export const StatusCard = ({
	name, // string
	status, // "completed" | "awaiting" | "progress" | "declined"
}) => {
	return (
		<Container>
			<TextContainer>
				<Name>{name}</Name>
				<StatusIndicator status={status} />
			</TextContainer>
			<ThreeDotContainer>
				{/* Doesn't exactly have a function yet */}
				<ThreeDot />
			</ThreeDotContainer>
		</Container>
	);
};
