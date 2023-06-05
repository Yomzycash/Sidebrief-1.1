import styled from "styled-components";

export const DocumentDownload = styled.div`
  width: 100%;
  max-width: 195px;
  min-height: 120px;
  max-height: 238px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  /* padding: clamp(16px, 1.5vw, 24px); */
  padding: 12px 16px;
  margin: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
`;

export const UploadWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  padding: 10px 24px;
  background: ${({ theme }) => theme.blue2};
  border-radius: 8px;
  outline: none;
  border: none;
  cursor: pointer;
  width: 100%;
  justify-content: center;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }
`;

export const Preview = styled.div`
  border: 1px dashed ${({ theme }) => theme.grey3};
  padding: 10px 24px;
  border-radius: 8px;
  height: 40px;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    overflow: hidden;
  }
`;

export const Delete = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 28px;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  /* border-left: 1px solid ${({ theme }) => theme.grey3}; */
`;
