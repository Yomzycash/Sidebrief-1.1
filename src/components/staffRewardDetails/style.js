import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  gap: 24px;
  display: flex;
  flex-flow: column;
  padding: 40px 24px;
`;

export const FullContentWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 24px;
  column-gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  row-gap: 24px;
  column-gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
export const TextWithLabel = styled.div`
  width: 100%;
`;

export const Label = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 10px;
  color: #4e5152;
`;

export const TextWrapper = styled.div`
  padding: 16px 24px;
  gap: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  background: #fafafa;
  border: 1px solid #edf1f7;
  border-radius: 8px;
`;
export const Text = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;

  /* Grey 1 */

  color: #242627;
`;
export const LinkText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  color: #00a2d4;
`;
