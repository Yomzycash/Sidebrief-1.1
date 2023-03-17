import React, { useState } from "react";
import { InputWithLabel } from "components/input";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import { NavigationWrapper, TabWrapper, ContentWrapper, TemplateBtn } from "./styled"
import CommonButton from "components/button/commonButton";
import NoBackgroundButton from "components/button/NoBackgroundButton";
import AddDocument from "containers/AddDocument";
import AddTemplate from "../../containers/AddTemplate";


function Tab({ label, isActive, onClick }) {
  return (
    <TabWrapper isActive={isActive} onClick={onClick}>
      {label}
    </TabWrapper>
  );
}



const tabs = [
	{ label: "Requirement Document Details", content: <AddDocument/> },
	{ label: "Template Information", content: <AddTemplate/> }
  ];
function ServiceTabbedNavigation () {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  return (
    <NavigationWrapper>
      {tabs.map((tab, i) => (
        <Tab
          key={i}
          label={tab.label}
          isActive={selectedTab === i}
          onClick={() => handleTabClick(i)}
        />
      ))}
      <ContentWrapper>{tabs[selectedTab].content}</ContentWrapper>
    </NavigationWrapper>
  );
}

export default ServiceTabbedNavigation;
