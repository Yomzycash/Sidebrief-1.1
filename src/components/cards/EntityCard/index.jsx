import React from "react";
import {
	Container,
	Corner,
	StartButton,
	Description,
	Title,
	Titles,
	Subtitle,
	Subtitles,
} from "./styles";
import { ReactComponent as CornerPetal } from "asset/svg/cornerPetal.svg";
import { TextWithArrow } from "components/texts";

export const EntityCard = ({
	action,
	name,
	price,
	shortname,
	company,
	timeline,
	shareholder,
	shares,
	type,
}) => {
	return (
		<Container onClick={action}>
			<Corner>
				<CornerPetal />
			</Corner>
		</Container>
	);
};

export { Wrapper as EntityWrapper } from "./wrapper";
