import styled from "styled-components";

export  const Wrapper = styled.div`
  width: 100%;
  padding: 40px 40px  20px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  width: 100%;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 100%;
`;
export const TopFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  justify-content: space-between;

  width: 100%;
`;
export const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;
export const EditWrapper = styled.div``;
export const FilledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;

  max-width: 429px;
  width: 100%;

  background: #d5d5d5;

  border: 1px solid #edf1f7;
  border-radius: 8px;
`;

export const CountryInput = styled.h3`
  font-weight: 600;
  font-size: 14px;
  line-height: 27px;

  display: flex;
  align-items: center;

  color: #959697;
`;
export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;
