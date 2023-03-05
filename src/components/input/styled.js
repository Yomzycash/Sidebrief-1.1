import { motion } from "framer-motion";
import styled from "styled-components";

export const InputWrapper = styled.div`
  border: ${(props) => props.border};
  align-items: center;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  padding: 8px 24px;
  height: 48px;
  transition: 0.3s all ease;
  background-color: ${({ disable }) => (disable ? "#f2f2f2" : "")};

  &:focus {
    outline: none;
    border-color: yellow;
  }

  @media screen and (max-width: 600px) {
    height: 48px;
  }
`;

export const DropWrapper = styled.div`
  border: 1px solid #ececec;
  align-items: center;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: solid red;
  padding: 0px 20px;
  margin-top: 20px;
  height: 48px;
  transition: 0.3s all ease;

  @media screen and (max-width: 600px) {
    height: 48px;
  }
`;

export const Wrapper = styled(motion.div)`
  display: flex;
  flex-flow: column;
  gap: clamp(8px, 0.8px, 12px);
  margin-bottom: 24px;
  width: 100%;
  position: relative;

  @media screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

export const Input = styled.input`
  color: #4e5152;
  height: 48px;
  width: 90%;
  border: none;
  background: none;
  outline: none;
  font-weight: 400;
  font-size: 14px;
  color: ${({ disabled }) => (disabled ? "#aca09f" : "")};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &::placeholder {
    font-size: 14px;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const Select = styled.select`
  color: #4e5152;
  height: 48px;
  width: 100%;
  border: none;
  padding: 5px 4px;
  background: none;
  cursor: inherit;
  outline: none;
  font-weight: 400;
  font-size: 14px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const Show = styled.p`
  cursor: pointer;
  color: #4e5152;
  font-size: 14px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const Label = styled.label`
  color: #4e5152;
  font-weight: 500;
  font-size: clamp(12px, 1.3vw, 14px);
`;

export const Iconwrapper = styled.div`
  margin-right: 20px;

  @media screen and (max-width: 600px) {
    margin-right: 18px;
  }
`;

export const ErrMsg = styled.div`
  color: red;
  font-size: 12px;
  justify-content: center;
  align-items: center;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DateWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .date {
    border: 0;
    width: 100%;
    height: 100%;
    outline: none;
    font-size: 14px;
  }
`;

export const TransparentBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export const CalendarWrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 90%;
  left: 30px;
  width: 100%;

  @media screen and (max-width: 500px) {
    left: 0;
    top: 110%;
  }

  .calendar {
    @media screen and (max-width: 500px) {
      font-size: 12px;
      max-width: 100%;
    }
  }
`;

// width: ${props => props.width };

// @media screen and (max-width: 600px) {
// font-size: 14px;
//   }
// `;

// Taginput styles
export const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  column-gap: 8px;
`;
export const TagWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  column-gap: 16px;
  row-gap: 8px;
  margin-bottom: 8px;
  min-width: fit-content;
`;
export const TagInputWrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
`;
export const TagItem = styled.div`
  display: inline-flex;
  flex-direction: row;
  padding: clamp(4px, 1vw, 7px) clamp(7px, 1vw, 11px);
  background: #0082aa;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  gap: 0.5em;
  color: #fafafa;
  text-transform: capitalize;
  opacity: ${({ $disable }) => ($disable ? 0.7 : 1)};
`;

export const TagText = styled.span`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: clamp(12px, 1.5vw, 14px);
  line-height: 21px;
`;
export const Tagclose = styled.span`
  height: 21px;
  width: 21px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
`;
export const TagInputField = styled.input`
  flex-grow: 1;

  width: inherit;
  height: inherit;
  outline: none;

  border: ${({ $error }) => ($error ? "1px solid red" : "1px solid #edf1f6")};
  padding: 10px;
  border-radius: 8px;
  transition: 0.3s all ease;
  color: ${({ disabled }) => (disabled ? "#aca09f" : "")};
  background-color: ${({ disabled }) => (disabled ? "#f2f2f2" : "")};

  &:focus {
    border: ${({ $error }) => ($error ? "1px solid red" : "1px solid #00c3ff")};
  }
`;

export const TagTop = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;

  span {
    font-size: clamp(10px, 1.5rem, 12px);
    color: red;
  }
`;

export const TagLabel = styled.label`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;

export const BottomText = styled.p`
  font-family: "BR Firma";
  font-weight: 400;
  font-size: 12px;
  line-height: 21px;
  color: #4e5152;
`;

export const TextArea = styled.textarea`
  transition: 0.3s ease all;
  height: max-content;
  min-width: 100%;
  min-height: 40px;
  border-radius: 8px;
  padding: 12px;
  resize: none;
  letter-spacing: 0;
  font-family: "Br Firma";
  border: ${({ $error }) => ($error ? "1px solid red" : "1px solid #ececec")};
  color: ${({ disabled }) => (disabled ? "#aca09f" : "#4e5152")};
  background-color: ${({ disabled }) => (disabled ? "#f2f2f2" : "")};
  font-family: "Br Firma", sans-serif;
  :focus {
    border: ${({ $error }) => ($error ? "1px solid red" : "1px solid #00A2D4")};
  }
`;

export const DropDownWrapper = styled.div`
  background: #ffffff;
  width: 100%;
  position: relative;
  padding: 4px;
  margin-top: 10px;
  height: 50px;
  border-radius: 8px;

  border: 1px solid #e1e1de;
`;

export const CheckInputBox = styled.input`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.46);
`;

export const ShowList = styled.div`
  background: #ffffff;
  width: 90%;
  align-items: center;
  display: flex;
  gap: 10px;
  padding-inline: 24px;
`;

export const ShowListIcon = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  cursor: pointer;
`;

export const DropDown = styled.div`
  background: #ffffff;
  border: 1px solid #e1e1de;
  position: absolute;
  width: 100%;
  z-index: 5;
  padding: 10px 0px;
`;

export const ListItems = styled.ul`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;
  gap: 10px;
  padding: 14px 10px;
  align-items: center;

  &:hover {
    background-color: rgba(0, 162, 212, 0.1);
    cursor: pointer;
  }
`;

export const Item = styled.p`
  font-size: 14px;
`;

export const OtherInput = styled.input`
  height: 80%;
  border: none;
  outline: none;
`;
