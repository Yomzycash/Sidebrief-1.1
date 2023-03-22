import styled from "styled-components";

export const DocumentSection = styled.div`
  padding: 33px 40px;
  /* border-width: 0px 1px 1px 1px;
border-style: solid; */
  border-color: #edf1f7;
`;

export const Document = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  width: 100%;
  gap: 25px;
`;
export const DocumentDownload = styled.div`
  width: 100%;
  max-width: 195px;
  min-height: 120px;
  max-height: 238px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  padding: 16px 36px;
  cursor: pointer;
`;
export const InnerDocument = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content:flex-start;
gap: 6px;
max-width


`;
export const DocumentFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(16px, 1.6vw, 24px);
`;

export const DocumentText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;

  display: flex;
  align-items: center;
  text-align: center;

  color: #4e5152;
`;
export const SmallText = styled.h5`
  font-size: 8px;
  color: #4e5152;
  font-weight: 500;
  opacity: 0.5;
`;
