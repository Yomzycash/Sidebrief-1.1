import React, { useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { useGetAllNotificationsQuery } from "services/chatService";
import { useSelector } from "react-redux";
import { store } from "redux/Store";
import { setUnreadLaunchNotifications } from "redux/Slices";
import { useGetAllServicesQuery } from "services/staffService";
import { useMemo } from "react";
import { getUnReadNotifications } from "components/navbar/actions";

const SidebarItem = ({ item, expanded, homePath }) => {
  const [iconHovered, setIconHovered] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const { refreshNotifications } = useSelector((store) => store.UserDataReducer);

  const notifications = useGetAllNotificationsQuery();
  // const services = useGetAllServicesQuery();

  const location = useLocation();
  const locationPath = location?.pathname;

  let isActive = locationPath?.includes(item.path);

  let homePathActive = homePath && item.id === 1;

  // useMemo(() => {
  //   if (!notifications.data || !services.data) return;

  //   let newNotifications = notifications.data?.filter(
  //     (notification) => notification?.messageIsRead === false
  //   );
  //   console.log(newNotifications);

  //   let servicesNotifications = services.data.map((service) =>
  //     newNotifications.filter((el) => el?.serviceId === service?.serviceId)
  //   );
  //   let servicesCount = servicesNotifications.filter((el) => el.length > 0);

  //   setUnreadLaunchNots(newNotifications?.length - servicesCount?.length);
  //   setUnreadServicesNots(servicesCount?.length);

  //   store.dispatch(setUnreadLaunchNotifications(newNotifications));
  // }, [services.data]);

  useEffect(() => {
    notifications.refetch();
  }, [refreshNotifications]);

  let newNotifications = getUnReadNotifications(notifications.data);

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
            style={({ isActive }) => (isActive || homePathActive ? { color: "#00a2d4" } : {})}
          >
            <item.icon
              filled={locationPath?.includes(item.path) || homePathActive}
              hover={iconHovered === item.id}
            />
            {expanded && item.title}
          </NavLink>
          {expanded && item.dropDownList && (
            <ArrowDown onClick={() => setCollapsed(!collapsed)} collapsed={collapsed}>
              <IoIosArrowUp />
            </ArrowDown>
          )}
        </div>
      </Item>
      {expanded && item.dropDownList && (
        <ListContainer collapsed={collapsed} items={item.dropDownList.length}>
          <List>
            {item?.dropDownList?.map((each, index) => (
              <ListItem key={index}>
                <NavLink
                  to={each.path}
                  onMouseEnter={() => setIconHovered(item.id + each.id)}
                  onMouseLeave={() => setIconHovered(0)}
                  style={({ isActive }) => (isActive || homePathActive ? { color: "#00a2d4" } : {})}
                >
                  <span>
                    <each.icon
                      filled={locationPath?.includes(each.path) || homePathActive}
                      hover={iconHovered === item.id + each.id}
                    />
                  </span>
                  <span>{each.title}</span>
                </NavLink>
                {/* {notifications.data?.length > 0 &&
                  each.path === "/staff-dashboard/businesses/services" && (
                    <Badge to={each.path}>{notifications.data?.length}</Badge>
                  )} */}
                {/* {newNotifications?.length > 0 &&
                  each.path === "/staff-dashboard/businesses/registration" && (
                    <Badge to={each.path}>{newNotifications?.length}</Badge>
                  )} */}
              </ListItem>
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
    color: ${({ theme }) => theme.grey1};

    padding: 12px 16px;
    border-radius: 8px;

    white-space: nowrap;
    border: none;

    > a {
      display: flex;
      flex: 1;
      align-items: center;
      gap: 8px;
      color: ${({ theme }) => theme.grey1};
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
  padding-left: 30px;

  height: ${({ collapsed, items }) => (collapsed ? 0 : `calc(${items * 30}px)`)};
  overflow: hidden;
  transition: 0.3s height ease;
`;

const List = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  :nth-of-type(odd) {
    margin-block: 8px;
  }

  > a:nth-of-type(1) {
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
    align-items: center;
    white-space: nowrap;
    text-decoration: none;
    line-height: 21px;
    color: ${({ theme }) => theme.grey1};
    transition: 0.3s all ease;

    :hover {
      color: #00a2d4;
    }

    span:nth-of-type(1) {
      display: flex;
      justify-content: center;
      width: 21px;
    }
  }
`;

const Badge = styled(Link)`
  color: white;
  background-color: #ed4e3a;
  border-radius: 4px;
  padding: 1px 6px;
  text-decoration: none;
  height: max-content;
`;

const ArrowDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transform: ${({ collapsed }) => (collapsed ? "rotate(180deg)" : "")};
  transition: 0.3s transform ease;
  padding: 0 5px;
`;
const ActiveStyle = {
  background: "#00a2d419",
  color: "#00a2d4",
};
