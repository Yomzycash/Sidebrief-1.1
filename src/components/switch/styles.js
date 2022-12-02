import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 18px 8px;
	gap: 60px;
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Text = styled.p`
	font-family: "BR Firma";
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #4e5152;
`;

export const SubText = styled.span`
	font-family: "BR Firma";
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #727474;
`;
