import styled from "styled-components";

export const TopFrame = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 144px;
	padding-inline: 24px;

	border-inline: 1px solid #edf1f7;
	border-bottom: 1px solid #edf1f7;
`;

export const UserContainer = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
`;

export const NameAndPost = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Name = styled.h6`
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: #242627;
`;

export const Position = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #727474;
`;

export const EditButton = styled.button`
	background: #00a2d4;
	border-radius: 8px;
	padding: 10px 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: none;
	cursor: pointer;

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.5px;

	color: #ffffff;

	svg {
		transform: scale(1.1);

		path {
			fill: #fff;
		}
	}
`;
