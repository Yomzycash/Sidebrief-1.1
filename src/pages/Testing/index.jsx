import React from "react";
import { Container, Horizontal } from "./styles";
import { StatusCard } from "components/cards";
import {} from "containers";

const TestingPage = () => {
	return (
		<Container>
			<h1>This is the testing Page</h1>
			<StatusCard
				name={"Ayomide Constructions & Husbands - L.L.C"}
				status={"completed"}
			/>
			<StatusCard
				name={"Ayomide Constructions & Husbands - L.L.C"}
				status={"awaiting"}
			/>
			<StatusCard
				name={"Ayomide Constructions & Husbands - L.L.C"}
				status={"progress"}
			/>
		</Container>
	);
};

export default TestingPage;
