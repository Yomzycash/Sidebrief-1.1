import styled from "styled-components";

export const SuccessWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  /* margin-top: 67px; */
  gap: 16px;

  min-height: calc(100vh - 300px);

  @media screen and (max-width: 600px) {
    padding: 0px 24px;
  }
`;
export const TextWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 600;
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
  min-width: 120px;
  width: 20vw;
  max-width: 190px;
`;
