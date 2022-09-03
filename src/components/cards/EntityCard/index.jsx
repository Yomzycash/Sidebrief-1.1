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
// import { ReactComponent as CornerPetalDeep } from "asset/svg/cornerPetalDeep.svg";
import { TextWithArrow } from "components/texts";

export const EntityCard = ({ action, entityInfo }) => {
	return (
		<Container onClick={action}>
			<Corner>
				<CornerPetal />
			</Corner>
			<Description>
				<Titles>
					{Object.keys(entityInfo).map((title, index) => (
						<Title key={index}>{title}</Title>
					))}
				</Titles>
				<Subtitles>
					{Object.values(entityInfo).map((subtitle, index) => (
						<Subtitle key={index}>{subtitle}</Subtitle>
					))}
				</Subtitles>
			</Description>
			<StartButton onClick={action}>
				<TextWithArrow blue>Get started</TextWithArrow>
			</StartButton>
		</Container>
	);
};
