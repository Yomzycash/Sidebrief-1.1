import styled from "styled-components";
import { InputWrapper, Wrapper } from "components/input/styled";

export const Container = styled.div`
	max-width: 671px;
	/* height: 501px; */
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 23px;
	padding: 40px;
`;

export const RadioButtons = styled.div`
	display: flex;
	gap: 40px;
`;

export const Price = styled.h5`
	font-family: "BR Firma";
	font-weight: 700;
	font-size: 32px;
	line-height: 40px;
	color: #242627;
`;

export const Text = styled.p`
	font-family: "BR Firma";
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	color: #4e5152;
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
`;

export const Radio = styled.div`
	display: flex;
	gap: 8px;
`;

export const RadioInput = styled.input``;

export const RadioLabel = styled.label`
	font-family: "BR Firma";
	font-weight: 500;
	font-size: 18px;
	line-height: 36px;
	color: #797979;

	${RadioInput}:checked + & {
		color: #00a2d4;
	}
`;

export const FormContainer = styled.form`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, minmax(250px, 1fr));
	column-gap: 40px;
	row-gap: 24px;

	.payment--label {
		font-family: "BR Firma";
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;
		color: #4e5152;
	}

	${InputWrapper} {
		margin-top: 8px;
	}

	${Wrapper} {
		margin-bottom: 0;
	}

	${Wrapper}:first-of-type {
		grid-column: span 2;
	}
`;

export const PaymentButton = styled.button`
	grid-column: span 2;
	padding: 16px 48px;
	height: 59px;
	background: #00a2d4;
	border-radius: 8px;
	border: none;

	/* Text */
	font-family: "BR Firma";
	font-weight: 500;
	font-size: 18px;
	line-height: 27px;
	letter-spacing: -0.5px;
	color: #ffffff;
`;
