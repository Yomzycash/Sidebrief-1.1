import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
`;

export const Head = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Title = styled.h3`
	font-family: "BR Firma";
	font-weight: 600;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: #151717;
`;

export const Subtitle = styled.p`
	font-family: "BR Firma";
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	color: #4e5152;
`;

export const MoreButton = styled.button`
	height: 36px;
	padding-inline: 24px;
	background: transparent;
	border: none;
	border-radius: 8px;
	cursor: pointer;
`;

export const Tail = styled.div`
	padding-block: 24px;
	display: flex;
	gap: 24px;
`;
