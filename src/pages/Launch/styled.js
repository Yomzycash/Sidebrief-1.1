import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-flow: column;
	gap: 24px;
	margin-bottom: 100px;
`;
export const Header = styled.div``;
export const Body = styled.div`
	display: flex;
	flex-flow: column;
	gap: 32px;
	padding-inline: 8%;
`;
export const InputsWrapper = styled.div`
	display: flex;
	flex-flow: row;
	gap: 20px;
`;
export const Bottom = styled.div`
	display: flex;
	width: 100%;
	padding-inline: 8%;
`;
export const EntityCardsWrapper = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	width: 100%;
	gap: 24px;
`;

export const CountryItem = styled.span`
	display: flex;
	gap: 16px;
	align-items: center;
`;
