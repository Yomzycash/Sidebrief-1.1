import styled from "styled-components";

export const DropDown = styled.div`
  width: 100px;
  margin: 0 auto;
  position: relative;
  user-select: none;
`;
export const DropDownBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  cursor: pointer;
`;

export const DropDownContent = styled.div`
  position: absolute;
  top: 25px;
  background: #fafafa;
  /* z-index: 1; */
  border: 1px solid #edf1f7;
  box-shadow: -4px 10px 16px 8px #95969714, 0px 10px 10px -5px #9596970a;
  border-radius: 12px;
  width: 200px;
  z-index: 1000;
 
  @media screen and (max-width: 380px) {
    width: fit-content;
    padding-inline-end : 10px;
   
  }
`;
export const DropDownItems = styled.div`
  padding: 4px 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
`;
export const TextContainer = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height, or 150% */
  display: flex;
  text-align: right;
  /* Grey 3 */
  color: #4e5152;
`;
export const ArrowDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: ${({ isActive }) => (isActive ? "rotate(180deg)" : "")};
  transition: 0.3s transform ease;
  padding: 0 5px;
`;
export const DropDownMobileContent = styled.div`
  position: absolute;
  top: 25px;
  background: #fafafa;
  /* z-index: 1; */
  border: 1px solid #edf1f7;
  box-shadow: -4px 10px 16px 8px #95969714, 0px 10px 10px -5px #9596970a;
  border-radius: 12px;
  width: 200px;
  z-index: 1000;
  @media screen and (max-width: 230px) {
    width: fit-content;
    padding-inline-end : 10px;
   
  }`
