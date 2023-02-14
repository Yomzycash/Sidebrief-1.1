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
	font-size: 14px;
	line-height: 18px;
	text-align: center;

	${({ color }) =>
		`background: ${tinycolor(color).setAlpha(0.1)};  
    color: ${color};
  `};

	${({ status }) => {
		switch (status) {
			case "completed":
				return `
                    background: #00d44819;
	                color: #00d448;
                `;
			case "awaiting":
			case "submitted":
				return `
                    background: #d400cc19;
	                color: #D400CC;
                `;
			case "progress":
				return `
                    background: #ffbf2919;
	                color: #FFBF29;
                `;
			case "declined":
				return `
                    background: #ed4e3a19;
	                color: #ED4E3A;
                `;
			case "draft":
			case "pending":
				return `
                  background: ${tinycolor("#333").setAlpha(0.1)};
	                color: #333;
        `;
			default:
				return "";
		}
	}}
`;
