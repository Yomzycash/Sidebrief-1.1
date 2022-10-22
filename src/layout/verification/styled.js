import styled from "styled-components";

export const SuccessWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 67px;

  @media screen and (max-width: 600px) {
    padding: 0px 24px;
  }
`;
export const TextWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  max-width: 590px;
  min-width: 300px;
`;

export const ParagraphText = styled.p`
  color: #4e5152;
  font-size: 20px;
  font-weight: 400;
  text-align: center;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const Image = styled.img`
  min-width: 80px;
  width: 15vw;
  max-width: 104px;
`;

export const ResendTextWrapper = styled.div`
  display: flex;
`;
