import React from "react";
import { Container } from "./styles";
import { LongCard } from "components/cards";

const TestingPage = () => {
	return (
		<Container>
			<h1>This is the testing Page</h1>
			<LongCard
				title={"Launch"}
				body={
					"Start your business registration process with no paperwork."
				}
			/>
			<LongCard
				title={"Shelf"}
				body={"Get pre-registered company in local markets."}
				notReady
			/>
		</Container>
	);
};

export default TestingPage;
