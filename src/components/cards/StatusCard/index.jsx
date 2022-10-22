import React, { useState } from "react";
import {
	Container,
	TextContainer,
	ThreeDotContainer,
	Name,
	Top,
	Description,
} from "./styles";
import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";
import { StatusIndicator } from "components/Indicators";

export const StatusCard = ({
	name, // string
	status,
	ShortDescription,
}) => {
	const [hover, setHover] = useState(false);

	return (
		<Container
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			hover={hover}
		>
			<TextContainer>
				<Top>
					<Name>{name}</Name>
					<StatusIndicator status={status} />
				</Top>
				<ThreeDotContainer>
					{/* Doesn't exactly have a function yet */}
					<ThreeDot />
				</ThreeDotContainer>
			</TextContainer>
			<Description hover={hover}>{ShortDescription}</Description>
		</Container>
	);
};
