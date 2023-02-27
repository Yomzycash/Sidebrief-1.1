import styled from "styled-components";

export const TextInputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 24px 0;
  filter: drop-shadow(-20px -5px 20px #c4c4c466);
  background: #fff;
  border-right: 1px solid #edf1f7;
`;
export const TextBody = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 24px;

  button {
    margin-top: 25px;
  }
`;
export const SubjectInput = styled.input`
  padding: 16px 13px;
  flex: 1;
  border: none;
  width: 100%;
  border-bottom: 0.5px solid #dddddd;
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000;
  resize: none;
  max-width: calc(100% - 136px);
  text-overflow: ellipsis;

  &::placeholder {
    color: #727474;
  }

  :disabled {
    color: #515151;
    background-color: #ececec;
  }
`;

export const TextInput = styled.textarea`
  height: 120px;
  padding: 16px 13px;
  flex: 1;
  border: none;

  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000;
  resize: none;

  &::placeholder {
    color: #727474;
  }
`;

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;
`;

export const FileBeforeUpload = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.grey2};
  font-size: 12px;
`;

export const Close = styled.span`
  margin-left: 10px;
  color: red;
  cursor: pointer;
`;

export const Files = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
