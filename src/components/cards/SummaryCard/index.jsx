import React from "react";
import { Container } from "./styled";

export const SummaryCard = ({ shown, total }) => {
	return (
		<Container>
			Showing {shown !== "undefined" ? shown : 0} of{" "}
			{total !== "undefined" ? total : 0} results
		</Container>
	);
};
