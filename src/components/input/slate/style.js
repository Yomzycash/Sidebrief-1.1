import styled from "styled-components";

export const Container = styled.div`
	height: 150px;
	padding: 0 13px 16px;
	/* border: none; */

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: #000;
	resize: none;
	/* position: relative; */
	overflow-y: auto;

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
		height: fit-content;
		width: 100%;

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
	& > * {
		display: inline-block;
	}
	& > * + * {
		margin-left: 15px;
	}
`;
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ErrMsg = styled.div`
  position: relative;
  color: red;
  font-size: 12px;
  justify-content: center;
  align-items: center;
`;
export const SlateTop = styled.div`
	margin: 0 -13px;
	border-bottom: 2px solid #eee;
	margin-bottom: 10px;
	position: sticky;
	top: 0;
	padding: 15px 18px 5px;
	background: #fff;
	z-index: 2;

	display: flex;
	align-items: center;
`;

export const ToolbarRight = styled.div`
	margin-left: auto;
	display: flex;
	gap: 16px;
`;

export const ControlButton = styled.span`
	cursor: pointer;
	font-size: 24px;
`;

export const Label = styled.label`
	cursor: pointer;
	font-size: 24px;
`;
