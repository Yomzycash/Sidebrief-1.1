import styled from "styled-components";

export const Container = styled.div`
	border: 1px solid blue;
	flex: 1;
	width: 100%;

	height: 120px;
	padding: 16px 13px 16px;
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

	blockquote {
		margin-left: 0px;
		margin-right: 0px;
		padding-left: 10px;
		color: rgb(170, 170, 170);
		font-style: italic;
		border-left: 2px solid rgb(221, 221, 221);
	}

	.editor {
		& > * + * {
			margin-top: 1em;
		}
	}

	ol {
		list-style-type: decimal;
	}

	ul {
		list-style-type: disc;
	}

	ol,
	ul {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		padding-inline-start: 40px;
	}
`;

export const ButtonSpan = styled.span`
	cursor: pointer;
	color: ${({ reversed, active }) =>
		reversed ? (active ? "white" : "#aaa") : active ? "black" : "#ccc"};
`;

export const IconSpan = styled.span`
	font-size: 18px;
	vertical-align: text-bottom;
`;

export const MenuDiv = styled.div`
	position: relative;
	padding: 1px 18px 17px;
	margin: 0 -13px;
	border-bottom: 2px solid #eee;
	margin-bottom: 20px;

	& > * {
		display: inline-block;
	}
	& > * + * {
		margin-left: 15px;
	}
`;
