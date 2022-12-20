import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-flow: column;
	width: 100%;
	flex: 1;
`;

export const Body = styled.div`
	display: flex;
	flex-flow: row nowrap;
`;
export const BodyLeft = styled.div``;
export const BodyRight = styled.div`
	display: flex;
	flex-flow: column;
	/* width: calc(100% - ${({ SidebarWidth }) => SidebarWidth}); */
	padding: 0px 0px 0px 40px;
	gap: 40px;
	@media screen and (max-width: 700px) {
		width: 100%;
	}
`;
export const RewardContainer = styled.div`
	display: grid;
	padding-right: 24px;
	padding-bottom: 24px;
	grid-template-columns: auto auto auto auto;
	gap: clamp(16px, 1.6vw, 24px);
	width: 100%;

	@media screen and (max-width: 430px) {
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: 16px;
	}

	@media screen and (max-width: 1000px) {
		grid-template-columns: auto auto;
	}

	@media screen and (min-width: 1550px) {
		grid-template-columns: auto auto auto auto;
	}
`;

export const ListItemsContainer = styled.ul`
	padding-right: 24px;
	margin: 20px 0px;
`;

export const ListItems = styled.ul`
	display: flex;
	/* justify-content: flex-end; */
	gap: 16px;
`;

export const ListItem = styled.li`
	list-style-type: none;
	font-weight: 500;
	font-size: 16px;
	line-height: 21px;
	color: #4e5152;
	cursor: pointer;
`;

export const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 40px;
	height: ${({ height }) => height && height};
`;
