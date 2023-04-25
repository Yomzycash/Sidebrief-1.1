import styled from "styled-components";

export const Container = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;

	background-color: #fff;
	border: 1px solid ${({ theme }) => theme.white1};
	z-index: 10;
`;

export const Item = styled.div`
	padding: 10px 10px;
	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.grey7};
	}
`;

export const InvisibleBackDrop = styled.div`
	background-color: transparent;
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 1;
`;

export const NoResultContainer = styled.div`
	position: absolute;
	top:100%;
	left:0;
	text-align:center;
	width: 100%;
	background-color: #fff;
	border: 1px solid ${({ theme }) => theme.white1};
	z-index: 10;
	 
	p {
		margin:10px;
	}
`;
