import styled from "styled-components";


export const Wrapper = styled.div`
  width: 100%;
  height: max-content;
  padding: 26px 20px;
`;
export const InnerWrapper = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
`;
export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
`;
export const TextWrapper = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;

  color: #4e5152;
`;

export const EditDeleteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 30px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 12px;
`;
export const EditWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 10px;
`;
export const EditText = styled.h3`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;
  text-align: right;

  /* Blue 1 */

  color: #0082aa;
`;
export const DeleteText = styled.h3`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */

  text-align: right;

  /* Red 3 */

  color: #ed4e3a;
`;

export const LowerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;

  max-width: 524px;

  /* Border Color */

  background: #edf1f7;
  border-radius: 8px;
`;
export const LinkContainer = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 27px;
  /* identical to box height, or 193% */

  display: flex;
  align-items: center;

  /* Grey 1 */

  color: #242627;
`;
