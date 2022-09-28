import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
`;
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #00a2d4;
`;

export const Form = styled.form`
  padding: 0 40px;
  /* padding-inline: clamp(15px, 4vw, 40px); */
  width: 100%;
  max-width: 962px;

  .input-label {
    font-size: 14px;
  }
  .input-class {
    height: 48px;
    margin-top: 8px;
    input {
      font-size: 14px;
    }
  }
`;

export const Title = styled.h3`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(15px, 1.5vw, 18px);
  font-weight: 400;
  color: #151717;
  /* padding: 40px; */
  padding: clamp(20px, 5%, 40px) 40px;
  margin: 0 -40px;
  border-bottom: 1px solid #edf1f7;
`;
export const ButtonLink = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.5px;
  display: flex;
  gap: 4px;
  color: #00a2d4;
`;
export const DetailedSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media screen and (max-width: 600px) {
    flex-flow: column;
    gap: 0;
  }
`;
export const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;
export const CheckInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 32px; */
  /* padding: 40px 0; */
  padding: clamp(20px, 5%, 40px) 0;
`;
export const ImgWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-bottom: 8px;
`;
export const AddMoreWrapper = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  background: transparent;
  outline: none;
  gap: 16px;
`;

export const EditWrapper = styled.div`
  cursor: pointer;
`;

export const DeleteWrapper = styled.div`
  cursor: pointer;
`;

export const SaveBtn = styled.button`
  cursor: pointer;
  border: 1px solid #00a2d4;
  width: 100px;
  height: 40px;
  color: #00a2d4;
  border-radius: 8px;
  background-color: #ffffff;
  :hover {
    background-color: #00a2d4;
    color: #ffffff;
  }
`;
export const ButtonWrapper = styled.div``;
export const CheckboxWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 20px;
  font-size: clamp(13px, 1.5vw, 14px);
  color: #4e5152;
  font-weight: 400;

  input {
    width: 20px;
  }

  span {
    color: #00a2d4;
  }

  > div {
    display: flex;
    flex-flow: row nowrap;
    gap: 16px;
    width: calc(50% - 10px);
  }
`;
