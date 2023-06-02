import styled from "styled-components";

export const DocumentDownload = styled.div`
  width: 100%;
  max-width: 200px;
  min-height: 120px;
  max-height: 238px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  padding: clamp(16px, 1.5vw, 24px);
  margin: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
`;

export const DocumentFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(16px, 1.6vw, 24px);
`;

export const DocumentText = styled.p`
  color: #4e5152;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

export const SmallText = styled.h5`
  font-size: 8px;
  color: #4e5152;
  font-weight: 500;
  opacity: 0.5;
`;
