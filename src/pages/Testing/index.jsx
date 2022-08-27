import React from "react";
import { Container, Horizontal } from "./styles";
import { LongCard, RewardCard } from "components/cards";
import { Rewards } from "containers";
import Lendha from "asset/images/lendhaLogo.png";
import { rewards } from "./constants";

const TestingPage = () => {
	return (
		<Container>
			<h1>This is the testing Page</h1>
			<Horizontal>
				<LongCard
					title={"Launch"}
					body={
						"Start your business registration process with no paperwork."
					}
					action={() => console.log("Launch")}
				/>
				<LongCard
					title={"Shelf"}
					body={"Get pre-registered company in local markets."}
					action={() => console.log("Shelf")}
					notReady
				/>
			</Horizontal>
			<Horizontal>
				{/* Thoughts: I think since this one isBig, then we should not pass title, body and action. since "isBig" only has one look */}
				<RewardCard
					isBig
					title={"Rewards"}
					body={
						"Access offers and rewards when you register your business with Sidebrief."
					}
					action={() => console.log("Lendha africa")}
				/>
				<RewardCard
					image={Lendha}
					imageAlt={"lendha"}
					title={"Lendha Africa"}
					body={"Get credit to register your business & pay later."}
					action={() => console.log("Lendha africa")}
				/>
			</Horizontal>
			<Rewards rewards={rewards} />
		</Container>
	);
};

export default TestingPage;
