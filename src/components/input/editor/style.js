import styled from "styled-components";

export const Container = styled.div`
	border: 1px solid #333;
	flex: 1;

	height: 120px;
	padding: 16px 13px;
	flex: 1;
	/* border: none; */

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: #000;
	resize: none;

	&::placeholder {
		color: #727474;
	}
`;
