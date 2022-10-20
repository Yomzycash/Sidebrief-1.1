import React from "react";
import styled from "styled-components";

const LaunchFormContainer = ({ children }) => {
	return <Container>{children}</Container>;
};

export default LaunchFormContainer;

const Container = styled.div`
	border-top: solid 1px #edf1f6;
	padding: 40px;
	gap: 24px;
	display: flex;
	flex-direction: column;

	@media screen and (max-width: 600px) {
		padding-inline: 24px;
	}
`;
