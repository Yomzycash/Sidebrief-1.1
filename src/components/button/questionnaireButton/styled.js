import styled from "styled-components";

export const ButtonContainer = styled.button`
// padding: 10px 20px;
// margin:10px;
// background-color: ${(props) => (props.active ? '#00A2D4' : '#fff')};
// color: ${(props) => (props.active ? '#fff' : '#959697')};
// border-color: ${(props) => (props.active) ? 'none' : '#EDF1F6'}
// border-radius: 10px;
// font-size: 16px;
// cursor: pointer;  
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${(props) => (props.active ? '#fff' : '#959697')};
    padding: 10px 24px;
    cursor: pointer;  
    border:none;
    border-radius: 8px;
    outline:none;
    max-width: max-content;
    background-color: ${(props) => (props.active ? '#00A2D4' : '#fff')};
`