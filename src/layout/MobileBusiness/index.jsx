import HeaderSearch from "components/HeaderSearch";
import CustomDropdown from "components/input/CustomDropdown";
import MobileNavbar from "components/navbar/MobileNavbar";
import MobileInfo from "containers/BusinessDetail/Header/MobileHeader";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userSidebarItems } from "utils/config";

const MobileBusiness = ({
  details,
  title,
  options,
  backLink,
  status,
  date,
  serviceName,
  code,
  type,
  isStaff,
  initialValue,
  selectedValue,
  business,
  reward,
  newSelectedValue,
  newOptions,
  servicesUrl,
  launchResponse,
  staffUrl,
  originalOptions,
  newOriginalOptions,
  realSelectedValue,
  initialTitle,
  initialLength,
  mobile,
}) => {
  return (
    <Layout>
      <Header>
        {!details ? (
          <MobileNavbar items={userSidebarItems} shadow border padding />
        ) : (
          <MobileNavbar
            items={userSidebarItems}
            backLink={backLink}
            shadow
            border
            padding
            details
          />
        )}

        {!details && <HeaderSearch title={title} />}
        {details && (
          <MobileInfo
            serviceName={serviceName}
            date={date}
            status={status}
            code={code}
            type={type}
            isStaff={isStaff}
            business={business}
            servicesUrl={servicesUrl}
            launchResponse={launchResponse}
            staffUrl={staffUrl}
          />
        )}
        <DropdownContainer>
          <CustomDropdown
            // options={options}
            intialvalue={!details ? "All" : initialValue}
            selectedValue={selectedValue}
            realSelectedValue={realSelectedValue}
            mobile={mobile}
            originalOptions={originalOptions}
            initialTitle={initialTitle}
            initialLength={initialLength}
          />
          {reward && (
            <CustomDropdown
              options={options}
              intialvalue={"All"}
              selectedValue={newSelectedValue}
              originalOptions={newOriginalOptions}
              position={"-50px"}
            />
          )}
        </DropdownContainer>
      </Header>
    </Layout>
  );
};

export default MobileBusiness;

const Layout = styled.div`
  width: 100%;
  padding: 40px 24px 0px 24px;
  background-color: #ffffff;

  position: sticky;
  top: 0;
  z-index: 1000;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;
const DropdownContainer = styled.div`
  display: flex;

  align-items: center;
  gap: 48px;
`;
