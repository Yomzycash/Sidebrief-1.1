import styled from "styled-components";
import { InputWrapper, Input } from "components/input/styled";

export const Container = styled.div`
	display: flex;
	flex-flow: column;
	gap: 24px;
	margin-bottom: 100px;
`;
export const Header = styled.div``;
export const Body = styled.div`
	display: flex;
	flex-flow: column;
	gap: 52px;
	padding-inline: 8%;
`;

export const InputsWrapper = styled.div`
	display: flex;
	flex-flow: row;
	gap: 20px;
`;
export const Bottom = styled.div`
	display: flex;
	width: 100%;
	padding-inline: 8%;
`;
export const EntityCardsWrapper = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	width: 100%;
	gap: 24px;
`;

export const CountryItem = styled.span`
	display: flex;
	gap: 16px;
	align-items: center;
`;

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

			${Input} {
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
