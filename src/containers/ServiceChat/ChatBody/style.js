import styled from "styled-components";
export const Wrapper = styled.div``;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Messages = styled.div`
	padding-inline: 24px;
	flex: 1;
	overflow-y: auto;

	display: flex;
	flex-direction: column-reverse;
	gap: 8px;

	margin-bottom: 40px;
`;
