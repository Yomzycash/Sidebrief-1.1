import styled from "styled-components";

export const Container = styled.div`
	width: 725px;
	height: 74px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding-inline: 24px;
	display: flex;
	align-items: center;
`;

export const TextContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
	flex: 1;
`;

export const ThreeDotContainer = styled.div`
	border-radius: 2px;
`;

export const Name = styled.h4`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.02em;
	color: #151717;
`;

export const Status = styled.p`
	width: max-content;
	height: 26px;
	border-radius: 8px;
	padding-inline: 16px;
	display: flex;
	align-items: center;

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 18px;

	${({ status }) => {
		switch (status) {
			case "completed":
				return `
                    background: rgba(0, 212, 72, 0.1);
	                color: #00d448;
                `;
			case "awaiting":
				return `
                    background: rgba(212, 0, 204, 0.1);
	                color: #D400CC;
                `;
			case "progress":
				return `
                    background: rgba(255, 191, 41, 0.1);
	                color: #FFBF29;
                `;
			default:
				return "";
		}
	}}
`;
