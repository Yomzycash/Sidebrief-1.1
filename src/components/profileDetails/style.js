import styled from "styled-components";

export const ProfileContainer = styled.div`
	display: flex;
	flex-flow: column;
	gap: 40px;
	width: 70vw;
`;

export const ProfileLeftContainer = styled.div`
	display: flex;
	flex-flow: column;
	gap: 40px;
`;

export const ProfileRightContainer = styled.div`
	display: flex;
	flex-flow: column;
`;
export const TextContainer = styled.div`
	width: 40%;
`;

export const TextTitle = styled.div`
	font-weight: 600;
	font-size: 14px;
	line-height: 21px;
	color: #242627;
`;
export const TextParagraph = styled.div`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #727474;
`;

export const PhotoDetails = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
`;

export const EmailDetails = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;
export const PhotoImage = styled.div`
	height: 48px;
	width: 48px;
`;
export const EmailWrapper = styled.div`
	padding: 16px 24px;
	gap: 16px;
	width: 60%;
	height: 48px;
	background: #fafafa;
	border: 1px solid #edf1f7;
	border-radius: 8px;
`;
export const AlternateEmailDetails = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
`;
export const PasswordDetails = styled.div`
	display: flex;
	width: 100%;
`;
export const InputWrapper = styled.div`
	width: 60%;
`;
