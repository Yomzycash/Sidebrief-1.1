import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: 1;
`;

export const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
export const BodyLeft = styled.div``;
export const BodyRight = styled.div`
  display: flex;
  flex-flow: column;
  /* width: calc(100% - ${({ SidebarWidth }) => SidebarWidth}); */
  padding: 0px 0px 0px 40px;
  margin-bottom: 40px;
  gap: 40px;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
export const RewardContainer = styled.div`
  display: grid;
  padding-right: 24px;
  padding-bottom: 24px;
  grid-template-columns: auto auto auto auto;
  gap: clamp(16px, 1.6vw, 24px);
  width: 100%;
  max-width: 1300px;

  @media screen and (max-width: 1250px) {
    grid-template-columns: auto auto auto;
    max-width: 1000px;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: auto auto;
  }

  @media screen and (max-width: 430px) {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 16px;
  }
`;

export const ListItemsContainer = styled.ul`
  padding-right: 24px;
  margin: 20px 0px;
`;

export const ListItems = styled.ul`
  display: flex;
  /* justify-content: flex-end; */
  gap: 16px;

  @media screen and (max-width: 430px) {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background-color: #ffffff;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    padding: 8px;
    z-index: 1;
  }
`;

export const ListItem = styled.li`
  list-style-type: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #4e5152;
  cursor: pointer;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;


export const DropdownIcon = styled.span`
  margin-left: 8px;
`;

export const DropdownContent = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${ListItems} {
    display: block;
  }
`;

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #4e5152;
  padding: 0;
`;

export const ArrowDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: ${({ isActive }) => (isActive ? "rotate(180deg)" : "")};
  transition: 0.3s transform ease;
  padding: 0 5px;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding:10px;
  gap:20px;
`;

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  max-width: 431px;
`;
// export const DropdownWrapper = styled.div`
//   display: flex;
//   gap: 8px;
//   align-items: center;
//   justify-content: space-between;

//   @media screen and (max-width:700px) {

//   }
// `;
export const CategoryText = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  
  /* identical to box height, or 150% */
  color: #000000;
  
`;