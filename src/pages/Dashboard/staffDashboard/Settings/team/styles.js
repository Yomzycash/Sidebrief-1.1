import styled from "styled-components";

export const Container = styled.div`
	border-inline: 1px solid #edf1f7;
	border-bottom: 1px solid #edf1f7;
	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;
	overflow: hidden;
`;

export const Top = styled.div`
	padding: 24px;
	display: flex;
	justify-content: space-between;
`;

export const Title = styled.h6`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: #4e5152;
`;

export const AddNew = styled.button`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	display: flex;
	align-items: center;
	color: #00a2d4;

	border: none;
	background: transparent;
	cursor: pointer;
`;
