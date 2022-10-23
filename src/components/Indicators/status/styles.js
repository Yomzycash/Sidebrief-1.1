import styled from "styled-components";
import tinycolor from "tinycolor2";

export const Status = styled.p`
	width: max-content;
	border-radius: 8px;
	padding: 3px 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 18px;
	text-align: center;
	background: ${({ color }) => tinycolor(color).setAlpha(0.1)};
	color: ${({ color }) => color};

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
			case "declined":
				return `
                    background: rgba(237, 78, 58, 0.1);
	                color: #ED4E3A;
                `;
			case "draft":
				return `
                  background: ${tinycolor("#333").setAlpha(0.1)};
	                color: #333;
        `;
			default:
				return "";
		}
	}}
`;
