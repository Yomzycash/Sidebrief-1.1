import styled from "styled-components";

export const Container = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;

	background-color: #fff;
	border: 1px solid ${({ theme }) => theme.grey5};
	z-index: 10;
`;

export const Item = styled.div`
	padding: 10px 10px;
	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.grey7};
	}
`;
