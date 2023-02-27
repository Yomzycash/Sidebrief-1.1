import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 8px;
  border-radius: 16px;
  cursor: pointer;
  opacity: ${({ $read }) => ($read ? 0.6 : 1)};

  width: 100%;
  height: 116px;
  background: ${({ selected }) =>
    selected
      ? "linear-gradient(0deg, rgba(0, 162, 212, 0.05), rgba(0, 162, 212, 0.05)), rgba(36, 38, 39, 0.05);"
      : " #FAFAFA"};
  border-left: ${({ selected }) => (selected ? " 2px solid #00A2D4" : "none")};

  /* &:hover {
    background: #fafafa;
    ${({ selected }) => selected && `background: #f1f1f1`};
  }

  ${({ selected }) => selected && `background: #f1f1f1`}; */
`;
export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  justify-content: space-between;

  /* gap: 106px; */
  width: 100%;
  height: 40px;
`;
export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0px;
  gap: 16px;

  width: max-content;
  cursor: pointer;
`;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 40px;
  max-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: 700;

  color: #fff;
  background-color: ${({ theme, isMyMessage }) =>
    isMyMessage ? "#00B895" : "#6a00c1"};
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;
  width: 100%;
  height: 100%;
`;
export const UpperText = styled.h3`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.grey1};

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
export const LowerText = styled.h4`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: #727474;
`;
export const LowerWrapper = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
  color: #4e5152;
  width: 100%;
  height: 36px;

  /* Remove this if you don't want to limit the text length */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
