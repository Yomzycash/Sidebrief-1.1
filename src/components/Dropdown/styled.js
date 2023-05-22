import styled from "styled-components"

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownList = styled.ul`
  position: absolute;
  display: none;
  width: 100%;
  height: auto;
`;

export const DropdownContent = styled.div`
  background-color: #f9fafb;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.open ? 'block' : 'none')};
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
`;

export const DropdownItem = styled.li`
  display: block;
  width: 100%;
  padding: 8px 16px;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;
