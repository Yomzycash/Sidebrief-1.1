import React from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const SidebarItem = ({ item, expanded, homePath }) => {
  const [iconHovered, setIconHovered] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const locationPath = location?.pathname;

  const [isActive] = useState(locationPath?.includes(item.path));

  const ActiveStyle = {
    background: "rgba(0, 162, 212, 0.1)",
    color: "#00a2d4",
  };

  let homePathActive = homePath && item.id === 1;

  return (
    <SidebarItemContainer>
      <Item>
        <div
          style={isActive || homePathActive ? ActiveStyle : {}}
          onClick={() => setCollapsed(!collapsed)}
        >
          <NavLink
            to={item.path}
            onMouseEnter={() => setIconHovered(item.id)}
            onMouseLeave={() => setIconHovered(0)}
            style={({ isActive }) =>
              isActive || homePathActive ? { color: "#00a2d4" } : {}
            }
          >
            <item.icon
              filled={locationPath?.includes(item.path) || homePathActive}
              hover={iconHovered === item.id}
            />
            {expanded && item.title}
          </NavLink>
          {expanded && item.dropDownList && (
            <ArrowDown
              onClick={() => setCollapsed(!collapsed)}
              collapsed={collapsed}
            >
              <IoIosArrowDown />
            </ArrowDown>
          )}
        </div>
      </Item>
      {expanded && item.dropDownList && (
        <ListContainer collapsed={collapsed} items={item.dropDownList.length}>
          <List>
            {item?.dropDownList?.map((each) => (
              <NavLink
                to={each.path}
                onMouseEnter={() => setIconHovered(item.id + each.id)}
                onMouseLeave={() => setIconHovered(0)}
                style={({ isActive }) =>
                  isActive || homePathActive ? { color: "#00a2d4" } : {}
                }
              >
                <each.icon
                  filled={locationPath?.includes(each.path) || homePathActive}
                  hover={iconHovered === item.id + each.id}
                />
                <span>{each.title}</span>
              </NavLink>
            ))}
          </List>
        </ListContainer>
      )}
    </SidebarItemContainer>
  );
};

export default SidebarItem;

const SidebarItemContainer = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  > div {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: 0.3s all ease;
    height: max-content;
    color: #242627;

    padding: 12px 16px;
    border-radius: 8px;

    white-space: nowrap;
    border: none;

    > a {
      display: flex;
      flex: 1;
      align-items: center;
      gap: 8px;
      color: #242627;
      text-decoration: none;
      transition: 0.3s all ease;

      :hover {
        color: #00a2d4;
      }
    }
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  height: ${({ collapsed, items }) =>
    collapsed ? 0 : `calc(${items * 35}px)`};
  overflow: hidden;
  transition: 0.3s height ease;
`;

const List = styled.div`
  display: flex;
  flex-flow: column;

  > a {
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
    align-items: center;
    white-space: nowrap;
    text-decoration: none;
    line-height: 21px;
    color: #242627;
    margin-top: 8px;
    transition: 0.3s all ease;

    :hover {
      color: #00a2d4;
    }
  }
`;

const ArrowDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: ${({ collapsed }) => (collapsed ? "rotate(180deg)" : "")};
  transition: 0.3s transform ease;
  padding: 0 5px;
`;
