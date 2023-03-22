import React, { useState } from "react";
import {
  SimpleNavBarWrapper,
  SimpleTabWrapper,
  SimpleContentWrapper,
  SimpleNavBar,
} from "./styled";

const SimpleTabNavBar = ({ tabsInfo, style, contentStyle, navStyle }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  return (
    <SimpleNavBarWrapper style={style}>
      <SimpleNavBar style={navStyle}>
        {tabsInfo.map((tab, i) => (
          <SimpleTabWrapper key={i} isActive={selectedTab === i} onClick={() => handleTabClick(i)}>
            {tab.label}
          </SimpleTabWrapper>
        ))}
      </SimpleNavBar>
      <SimpleContentWrapper style={contentStyle}>
        {tabsInfo[selectedTab].content}
      </SimpleContentWrapper>
    </SimpleNavBarWrapper>
  );
};

export default SimpleTabNavBar;
