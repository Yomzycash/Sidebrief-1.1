import styled from "styled-components";

export const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;

	max-width: 528px;
	height: 417px;
	background: #ffffff;
	/* background: greenyellow; */
	border-radius: 16px;
	padding: 40px;

	box-shadow: -4px 10px 16px 8px #95969714,
		0px 10px 10px -5px #9596970a;

	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const CloseButton = styled.button`
	background: transparent;
	border: none;
	align-self: flex-end;
`;

export const Inner = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
`;

export const Heading = styled.h6`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: -0.5px;

	color: ${({ theme }) => theme.grey1};
`;

export const Text = styled.p`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;

	text-align: center;

	color: #757886;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: calc(40px - 24px);

	.label {
		font-family: "BR Firma";
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;

		color: #4e5152;
	}
`;

export const Bold = styled.span`
	font-weight: 600;
`;

export const Controller = styled.div`
	display: flex;
	gap: 24px;
	height: 44px;
`;

export const Submit = styled.button`
	flex: 1;
	background: #00a2d4b7;
	border-radius: 8px;
	border: none;

	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 27px;
	letter-spacing: -0.5px;

	color: #ffffff;

	&:disabled {
		color: #ffffffa3;
		cursor: not-allowed;
	}
`;

export const Cancel = styled(Submit)`
	background: transparent;
	border: 1px solid #00a2d4;
	color: #00a2d4;
`;
