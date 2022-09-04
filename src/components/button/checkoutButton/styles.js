import styled from "styled-components";

export const Container = styled.button`
	padding-inline: 50px;
	height: 60px;
	background: #00a2d4;
	border-radius: 8px;
	border: none;
	color: #ffffff;
	cursor: pointer;

	${({ isBack }) =>
		isBack &&
		`
        background: #ffffff;
        color: #00a2d4;
        outline: 1px solid #00a2d4;
    `}
	span {
		font-family: "BR Firma";
		font-weight: 500;
		font-size: 18px;
		line-height: 150%;
		letter-spacing: -0.5px;

		color: inherit;
	}
`;
