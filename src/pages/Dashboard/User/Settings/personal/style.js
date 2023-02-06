import styled from "styled-components";

export const Container = styled.form``;

export const TopFrame = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 144px;
	padding-inline: 24px;

	border-inline: 1px solid #edf1f7;
	border-bottom: 1px solid #edf1f7;

	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;

	margin-bottom: 40px;
`;

export const UserContainer = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
`;

export const NameAndPost = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Name = styled.h6`
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: -0.02em;
	color: ${({ theme }) => theme.grey1};
`;

export const Position = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #727474;
`;

export const EditButton = styled.button`
	background: #00a2d4;
	border-radius: 8px;
	padding: 10px 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: none;
	cursor: pointer;

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.5px;

	color: #ffffff;

	svg {
		transform: scale(1.1);

		path {
			fill: #fff;
		}
	}
`;

export const BottomFrame = styled.div`
	padding: 24px;
	border: 1px solid #edf1f7;
	border-radius: 16px;

	display: flex;
	flex-direction: column;
	gap: 40px;

	/* input[name="email_address"] {
		background: red;
	} */

	/* .emailstyle {
		background: transparent;
		border: none;

		input {
			color: ${({ theme }) => theme.grey1};
		}
	} */
`;

export const GridLayout = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
	gap: 24px;

	@media screen and (max-width: 800px) {
		grid-template-columns: 1fr;
	}
`;

export const SubmitOrCancel = styled.div`
	display: flex;
	gap: 40px;
`;

export const Submit = styled(EditButton)``;

export const Cancel = styled(EditButton)`
	background: transparent;
	color: #00a2d4;
`;

export const PictureUploadContainer = styled.div`
	display: flex;
	gap: 75px;
	align-items: center;
`;

export const UploadText = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;

	h6 {
		font-weight: 600;
		font-size: 14px;
		line-height: 21px;
		color: ${({ theme }) => theme.grey1};
	}

	p {
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: -0.02em;
		color: #727474;
	}
`;

export const ClickToUpload = styled.label`
	cursor: pointer;

	input {
		display: none;
	}

	svg {
		width: 48px;
		height: 48px;
	}
`;

export const ErrorText = styled.p`
	color: red;
	font-size: 12px;
	justify-content: center;
	align-items: center;
`;
