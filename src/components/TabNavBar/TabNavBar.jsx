import React, { useEffect, useState } from "react";
import {
  NavWrapper,
  NavLinkWrapper,
  ContentWrapper,
  wrapperLink,
  LinkContent,
} from "./styled.js";
import { NavbarLink, NavMore } from "utils/config";
import styled from "styled-components";
import { IoChevronDown } from "react-icons/io5";

const TabNavBar = ({ icon }) => {
  const [boxshadow, setBoxShadow] = useState("false");
  const [navList, setNavList] = useState(NavbarLink);
  const [navMore, setNavMore] = useState(NavMore);
  const [pop, setPop] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
    });
  }, []);
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     if (window.innerWidth <= 920 && pop === 0) {
  //       setPop(pop + 1);
  //     } else if (window.innerWidth > 920) {
  //       setPop(0);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   for (let i = 1; i <= pop; i++) {
  //     const newPopped = navList.pop();
  //     setNavMore([...navMore, newPopped]);
  //     const filteredNav = navList.filter((list, index) => {
  //       return index !== navList.length - 1;
  //     });
  //     setNavList(filteredNav);
  //   }
  // }, [pop]);

  return (
    <NavWrapper boxshadow={boxshadow}>
      <ContentWrapper>
        {NavbarLink.map((item, index) => (
          <NavLinkWrapper to={item.path} key={index}>
            <LinkContent>{item.title}</LinkContent>
          </NavLinkWrapper>
        ))}
        <More>
          <LinkContent>
            More
            <IoChevronDown size={15} />
          </LinkContent>
          <MoreContent>
            {NavMore.map((item, index) => (
              <NavLinkWrapper to={item.path} key={index}>
                <LinkContent>{item.title}</LinkContent>
              </NavLinkWrapper>
            ))}
          </MoreContent>
        </More>
      </ContentWrapper>
    </NavWrapper>
  );
};

export default TabNavBar;
const TextWrapper = styled.div`
  padding: 0px 8px;
  :hover {
    cursor: pointer;
    background: rgba(0, 162, 212, 0.1);
    border-radius: 20px;
    color: #00a2d4;
  }
`;

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const More = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  &:hover {
    > div {
      display: flex;
    }
  }
`;
const MoreContent = styled.div`
  position: absolute;
  left: -18px;
  top: 15px;
  display: none;
  flex-flow: column;
  background-color: #ffffff;
  box-shadow: 0 0 5px #bfbfbf8d;
  border-radius: 8px;
  padding: 5px 10px;
  /* &::before {
    content: "";
    width: 15px;
    height: 15px;
    border-bottom: 1px solid black;
    position: absolute;
    top: -15px;
    left: 25px;
    box-shadow: 0 0 5px #bfbfbf8d;
    background-color: #ffffff;
  } */
`;
