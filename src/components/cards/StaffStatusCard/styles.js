import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	align-items: flex-start;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: -4px 10px 16px 8px #95969714,
		0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 32px;
	width: 100%;
	min-width: max-content;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding-inline: clamp(20px, 2vw, 36px);
	gap: 8px;
	width: 100%;
	height: 150px;
	border-left: ${({ border }) => border || "1px solid #edf1f7"};
	/* border-radius: ${(props) => (props.border ? props.border : "0px")}; */
`;
export const Top = styled.h5`
	font-weight: 500;
	font-size: clamp(12px, 1.2vw, 14px);
	line-height: 21px;
	letter-spacing: -0.01em;
	color: #4e5152;
`;
export const Middle = styled.p`
	font-weight: 700;
	font-size: clamp(16px, 1.6vw, 18px);
	line-height: 24px;
	margin-left: 0px !important;
	display: flex;
	align-items: center;
	color: #242627;
`;

export const BottomWrapper = styled.div`
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	font-style: italic;
	gap: 4px;
	font-style: italic;
	font-weight: 500;
	font-size: clamp(10px, 1vw, 12px);
	line-height: 21px;
	color: #242627;
	white-space: nowrap;
`;
export const IconWrapper = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: ${(props) => (props.color ? props.color : "#00D448")};
`;
export const LastContainer = styled.div`
	max-width: 134px;
	width: 100%;
	border-left: 1px solid #edf1f7;
	padding-inline: clamp(20px, 2vw, 36px);

	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-size: 12px;
	line-height: 21px;
	color: #4e5152;
	gap: 3px;
`;

export const DropdownWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
