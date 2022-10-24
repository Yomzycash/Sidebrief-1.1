import styled from "styled-components";

export const Container = styled.div`
	padding-inline: 40px;
	display: flex;
	flex-direction: column;
	gap: 40px;
	padding-bottom: 40px;
`;

export const DetailContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 24px;

	& > div:first-of-type {
		flex: 1;
	}
`;
