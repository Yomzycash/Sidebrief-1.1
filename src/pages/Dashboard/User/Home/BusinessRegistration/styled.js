import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-flow: column;
	flex: 1;
	width: 100%;
`;
export const Top = styled.div``;
export const Body = styled.div`
	display: flex;
	flex-flow: column;
`;
export const Main = styled.div`
	display: flex;
	flex-flow: column;
	gap: clamp(1px, 2vw, 23px);
	/* border: 1px solid red; */
	max-width: 1200px;
`;
export const Recently = styled.div`
	display: flex;
	flex-flow: column;
	/* justify-content: space-between; */
	flex: 2;
	gap: 16px;
`;
