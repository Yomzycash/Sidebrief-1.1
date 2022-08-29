import React from "react";
import {
	Container,
	TextContainer,
	ThreeDotContainer,
	Name,
	Status,
} from "./styles";
import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";

export const StatusCard = ({
	name, // string
	status, // "completed" | "awaiting" | "progress"
}) => {
	const getStatus = (status) => {
		switch (status) {
			case "completed":
				return "Completed";
			case "awaiting":
				return "Awaiting Approval";
			case "progress":
				return "In Progress";
			default:
				return "";
		}
	};

	return (
		<Container>
			<TextContainer>
				<Name>{name}</Name>
				<Status status={status}>{getStatus(status)}</Status>
			</TextContainer>
			<ThreeDotContainer>
				<ThreeDot />
			</ThreeDotContainer>
		</Container>
	);
};
