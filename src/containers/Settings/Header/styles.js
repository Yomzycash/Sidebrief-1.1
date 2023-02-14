import styled from "styled-components";

export const Container = styled.div`
	width: calc(100% - 80px);
	align-self: flex-end;
	/* margin-left: auto; */
	margin-right: 40px;
	border-inline: 1px solid #edf1f7;
	border-bottom: 1px solid #edf1f7;

	${({ curveBottom }) =>
		curveBottom &&
		`border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
	`}
`;

export const Top = styled.div`
	padding-inline: 24px;
	padding-block: 40px;
	display: flex;
	justify-content: space-between;
`;

export const Heading = styled.h2`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 36px;
	color: ${({ theme }) => theme.grey1};
`;

export const SubHeader = styled.div`
	border-top: 1px solid #edf1f7;
	display: flex;
	gap: 16px;
	padding-inline: 24px;
	width: 100%;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-behavior: smooth;

	&::-webkit-scrollbar {
		height: 5px;
		background: ${({ $hovered }) => ($hovered ? "#aaaaaa33" : "#fff")};
	}
	&::-webkit-scrollbar-thumb {
		background: ${({ $hovered }) => ($hovered ? "#aaaaaa" : "#fff")};
		border-radius: 15px;
	}

	@media screen and (max-width: 700px) {
		/* border-width: 1px 0px;
        border-style: solid; */
		border-bottom: 1px solid #edf1f7;
		/* border-color: #edf1f7; */
	}
`;
