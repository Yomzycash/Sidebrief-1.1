import styled from "styled-components";
import { InputWrapper, Input } from "components/input/styled";

export const Page = styled.div`
	padding-block: 32px;
	padding-inline: 8%;
`;

export const Inputs = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, minmax(350px, 1fr));
	gap: 20px;

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}

	.checkoutInput {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 0;

		${InputWrapper} {
			margin-top: 0;
			height: 48px;

			input {
				height: 100%;
				width: 100%;
			}
		}
	}

	.checkoutInputLabel {
		font-family: "BR Firma";
		font-weight: 500;
		font-size: clamp(13px, 1.5vw, 14px);
		line-height: 21px;
		color: #4e5152;
	}
`;
