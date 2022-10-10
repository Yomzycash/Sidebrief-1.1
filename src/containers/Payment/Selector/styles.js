import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	display: flex;
	border-top: 1px solid #edf1f7;
	border-bottom: 1px solid #edf1f7;
`;

export const PayProvide = styled.button`
	flex: 1;
	height: 80px;
	background: #fff;
	border: none;
	cursor: pointer;

	${({ active }) => (active ? ` background: #edf1f7;` : null)}

	&:hover {
		background: #edf1f7;
	}
`;