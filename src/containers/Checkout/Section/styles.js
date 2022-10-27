import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 40px 20px;
  padding: clamp(24px, 3.4vw, 40px) clamp(24px, 3.4vw, 40px)
    clamp(10px, 1.4vw, 20px);

  > p {
    font-size: 14px;
    color: #151717;
    margin-top: 40px;
    margin-top: clamp(8px, 2vw, 30px);
  }

  @media screen and (max-width: 600px) {
    padding-inline: 20px;
  }
`;

export const Heading = styled.h3`
  display: flex;
  justify-content: space-between;
  font-family: BR Firma;
  font-size: clamp(18px, 1.8vw, 20px);
  font-weight: 600;
  line-height: 21px;
  color: #151717;

  span {
    font-size: 14px;
    font-weight: 400;
    color: red;
  }
`;

export const CheckBox = styled.div`
  display: flex;
  gap: 16px;
  margin-top: clamp(8px, 2vw, 40px);
  color: #151717;
  font-size: clamp(12px, 1.2vw, 14px);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  input {
    width: 20px;
    color: yellow;
    border-radius: 4px;
  }

  span {
    color: #0082aa;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;
export const SectionContainer = styled.p`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 14px;
    font-weight: 500px;
  }
`;
