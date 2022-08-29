import styled from "styled-components";

export const NavWrapper = styled.div`
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding: 30px clamp(16px, 5%, 58px);
  border-bottom: ${(prop) => prop.border};
  background-color: white;
  box-shadow: ${(props) =>
    props.boxShadow === true ? "0px 10px 15px -5px #9596971a" : ""};
`;

export const Image = styled.img`
  max-width: 134px;
  width: 18%;
  min-width: 84px;
`;
export const BellIcon = styled.img`
  width: 20px;
  height: 20px;
`;
export const UserIcon = styled.img`
  width: 20px;
  height: 20px;
`;
export const DownIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;
export const SearchBar = styled.input`
  background: transparent;
  outline: none;
  width: 90%;
  border: none;
  margin-left: 5px;
`;
export const SearchIconWrapper = styled.div`
  width: 5%;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 10px;
`;

export const SearchBarWrapper = styled.div`
  width: 563px;
  border: 1px solid #edf1f7;
  border-radius: 20px;
  background: #fafafa;
  display: flex;
  padding: 10px 16px;
`;
export const RightIcons = styled.div`
  display: flex;
  align-items: center;
`;
export const BellContainer = styled.div`
  border: 1px solid #edf1f7;
  border-radius: 8px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
`;

export const UserContainer = styled.div`
  background: #f1f1f1;
  border-radius: 20px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  margin-left: 24px;
`;
