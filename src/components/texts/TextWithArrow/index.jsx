import React from "react";
import { Container, Text } from "./styles";
import { ReactComponent as ArrowBlueRight } from "asset/svg/arrow-blue-right.svg";
import { ReactComponent as ArrowWhiteRight } from "asset/svg/arrow-white-right.svg";

export const TextWithArrow = ({ children, blue, hover }) => {
	return (
		<Container hover={hover}>
			<Text isBlue={blue}>{children}</Text>
			{blue ? <ArrowBlueRight /> : <ArrowWhiteRight />}
		</Container>
	);
};
