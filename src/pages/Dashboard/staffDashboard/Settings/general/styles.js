import styled from "styled-components";

export const DetailContainer = styled.div`
	padding-inline: 24px;
	margin-top: 40px;
`;

export const Top = styled.div`
	padding: 40px 24px;
	border-inline: 1px solid #edf1f7;
	border-bottom: 1px solid #edf1f7;
	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ProfileImage = styled.div`
	height: 64px;
	width: 64px;

	svg {
		height: 100%;
		width: 100%;
	}
`;

export const NameContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const Frame = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	white-space: nowrap
`;

export const Name = styled.h6`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: ${({ theme }) => theme.grey1};
`;

export const Title = styled.p`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #727474;
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 40px;

	
`;

export const Button = styled.button`
	height: 44px;
	padding-inline: 24px;
	background-color: transparent;
	border: none;
	border-radius: 8px;

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: -0.5px;

	color: #00a2d4;
	cursor: pointer;
`;

export const FilledButton = styled(Button)`
	background-color: ${({ theme }) => theme.blue2};
	color: #fff;
`;
