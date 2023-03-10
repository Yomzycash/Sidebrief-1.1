import styled from "styled-components";

export const Container = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
`;

export const FileTitle = styled.p`
  font-size: 14px;
  line-height: 27px;
  align-items: center;
  color: #959697;
  text-align: center;
`;

export const FileZone = styled.div`
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
  padding: ${(props) => (props.padding ? props.padding : "10.5px 16px")};
`;

export const FileSection = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  position: relative;
`;
export const DeleteWrapper = styled.div`
  position: absolute;
  right: 30px;
  bottom: 25px;
`;

export const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  width: 90%;
  background-color: ${(props) => props.backgroundColor};
  padding: 0px 10px;
  /* border: 2px solid red; */
  position: relative;
`;
export const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
export const DocTitle = styled.p`
  font-weight: 500;
  font-size: clamp(12px, 1.5vw, 14px);
  color: #4e5152;
`;
export const ErrorWrapper = styled.p`
  color: red;
  font-size: clamp(10px, 1.5vw, 12px); ;
`;
export const Bottom = styled.div`
  font-size: clamp(11px, 1.5vw, 12px);
  color: #959697;
`;
export const Details = styled.div`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 27px;
  text-decoration-line: underline;
  color: #151717;
  gap: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export const DownLoadPageTextWrapper = styled.div`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  padding-inline: 24px;
  display: flex;
  align-items: center;
`;

export const DownLoadLeftHold = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const DownLoadPageText = styled.div`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: clamp(14px, 1.6vw, 16px);
  color: #242627;
  flex-direction: column;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const DownloadSize = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #4e5152;
  margin-top: -10px;
`;

export const DetailsPage = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #151717;
  text-decoration-line: underline;
  cursor: pointer;
`;

export const KYCPage = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #959697;
`;
