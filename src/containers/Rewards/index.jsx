import React from "react";
import {
	Container,
	Subtitle,
	TextContainer,
	Title,
	Head,
	MoreButton,
	Tail,
} from "./styles";
import { TextWithArrow } from "components/texts";
import { RewardCard } from "components/cards";

export const Rewards = ({ rewards }) => {
	return (
		<Container>
			<Head>
				<TextContainer>
					<Title>Rewards</Title>
					<Subtitle>
						Access offers and rewards when you register your
						business with Sidebrief.
					</Subtitle>
				</TextContainer>
				<MoreButton onClick={() => console.log("View All")}>
					<TextWithArrow blue>View All</TextWithArrow>
				</MoreButton>
			</Head>
			<Tail>
				{/* We might have to use something like react-carousel later */}
				{rewards.map((reward) => (
					<RewardCard
						image={reward.image}
						imageAlt={reward.imageAlt}
						title={reward.title}
						body={reward.body}
					/>
				))}
			</Tail>
		</Container>
	);
};
