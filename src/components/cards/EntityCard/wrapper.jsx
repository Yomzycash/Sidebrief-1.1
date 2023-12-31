import React from "react";
import styled from "styled-components";

export const Wrapper = ({ children }) => {
	return <Container>{children}</Container>;
};

const Container = styled.div`
	width: 100%;
	display: flex;
	gap: 24px;
	flex-wrap: wrap;
`;
