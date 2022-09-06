import styled from "styled-components";

export const InputContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
`;

export const InputFrame = styled.div`
	flex: 1;
	/* width: 50%; */
	min-width: 350px;
	justify-content: space-between;

	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const Gap = styled.div`
	display: block;
	height: ${({ height }) => `${height}px`};
`;
