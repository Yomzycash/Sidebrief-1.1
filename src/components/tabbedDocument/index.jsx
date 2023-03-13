import React, { useState } from "react";
import { InputWithLabel } from "components/input";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import { NavigationWrapper, TabWrapper, ContentWrapper, TemplateBtn } from "./styled"
import CommonButton from "components/button/commonButton";
import NoBackgroundButton from "components/button/NoBackgroundButton";
import { ReactComponent as AddIcon } from "../../../src/asset/svg/Plus.svg";
function Tab({ label, isActive, onClick }) {
  return (
    <TabWrapper isActive={isActive} onClick={onClick}>
      {label}
    </TabWrapper>
  );
}

const TemplateInput = () => {
	return (
		<>
			<InputWithLabel
			label="Document Details"
			labelStyle="input-label"
			placeholder="Enter Document name here"
			type="text"
			name="name"
			inputClass="input-class"
			containerStyle="input-container-class"
		/>
			<TemplateBtn>
				<NoBackgroundButton text="Add New Document"/>
			</TemplateBtn>
		</>
	)
}

const TemplateInput2 = () => {
	return (
		<>
			<InputWithLabel
				label="Template Details"
				labelStyle="input-label"
				placeholder="Enter template title here"
				type="text"
				name="name"
				inputClass="input-class"
				containerStyle="input-container-class"
			/>

			<InputWithLabel
				placeholder="Enter template url here"
				type="text"
				name="name"
				inputClass="input-class"
				containerStyle="input-container-class"
			/>
			 <TemplateBtn>
				<NoBackgroundButton text="Add New Template" />
			</TemplateBtn>
		</>
		
	)
}

const tabs = [
	{ label: "Requirement Document Details", content: <TemplateInput/> },
	{ label: "Template Information", content: <TemplateInput2/> },
  ];
function TemplateHeader() {
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

export default TemplateHeader;
