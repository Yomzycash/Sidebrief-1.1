import styled from "styled-components";

export const Container = styled.div`
	width: 450px;
	height: 352px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding-block: 24px;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	z-index: 0;
`;

export const StartButton = styled.button`
	height: 36px;
	border-radius: 8px;
	border: none;
	background: transparent;
	padding-inline: 24px;
`;

export const Corner = styled.div`
	position: absolute;
	top: 0;
	right: 0;
`;

export const Description = styled.div`
	padding-inline: 24px;
	display: flex;
	gap: 8px;
`;

export const Titles = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Title = styled.p`
	padding: 2px 6px;
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
	color: #727474;
	background: #fff;
`;

export const Subtitles = styled(Titles)``;

export const Subtitle = styled(Title)``;
