import styled from "styled-components";
import { InputWrapper, Wrapper } from "components/input/styled";

export const Container = styled.div`
  max-width: 671px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  margin: auto;
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 23px;
  padding: 40px;

  @media screen and (max-width: 600px) {
    border-radius: 0;
    border-inline: none;
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 20px;
  text-transform: capitalize;
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
  color: ${({ theme }) => theme.grey1};
`;

export const Text = styled.p`
  font-family: "BR Firma";
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #4e5152;

  @media screen and (max-width: 600px) {
    text-align: center;
  }
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
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.5px;
  color: #ffffff;
`;

export const Flutterwave = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .flutterwave-button {
    cursor: pointer;
    grid-column: span 2;
    padding: 16px 48px;
    height: 59px;
    background: #00a2d4;
    border-radius: 8px;
    border: none;
    width: 80%;

    /* Text */
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.5px;
    color: #ffffff;
    transition: 0.3s ease all;

    :hover {
      opacity: 0.8;
    }
    :active {
      transform: scale(0.95);
    }
  }

  @media screen and (max-width: 600px) {
    .paystack-button {
      width: 100%;
      height: auto;
      padding: 16px;
    }
  }
`;

export const ButtonContainer = styled.form`
  width: 80%;
  display: flex;
  flex-flow: column;
  gap: 24px;
`;
export const FormData = styled.div`
  border: solid red;
  padding: 12px 24px;
  border: 1.5px solid #edf1f7;
  border-radius: 8px;
`;

export const ButtonHolder = styled.div`
  margin-top: 24px;
`;

export const SPaymentButton = styled.button`
  background-color: #00a2d4 !important;
  color: white;
  border-radius: 8px !important;
  padding: 16px auto !important;
  transition: 0.3s ease all;

  background-color: ${({ $success }) => ($success ? "#28FF9D" : "")} !important;
`;

export const SubscriptionFormContainer = styled.form`
  width: 100%;
  /* background-color: green; */

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 20px;

  .element1 {
    grid-row: 1 / 1;
    grid-column: 1 / -1;
  }

  .element2,
  .element3 {
  }

  .submit {
    grid-column: 1 / -1;
    width: 100%;
    max-width: 100%;
    height: 59px;
    display: flex;
    justify-content: center;

    span {
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
    }
  }
`;
