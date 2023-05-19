import HeaderSearch from "components/HeaderSearch";
import CustomDropdown from "components/input/CustomDropdown";
import MobileNavbar from "components/navbar/MobileNavbar";
import MobileInfo from "containers/BusinessDetail/Header/MobileHeader";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { staffSidebarItems } from "utils/config";

const MobileStaff = ({
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
  mobile
}) => {
  return (
    <Layout>
      <Header>
        {!details ? (
          <MobileNavbar items={staffSidebarItems} shadow border padding />
        ) : (
          <MobileNavbar
            items={staffSidebarItems}
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
        <CustomDropdown
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
            // options={newOptions}
            // intialvalue={"All"}
            // selectedValue={newSelectedValue}
            // mobile
            options={newOptions}
            intialvalue={"All"}
            selectedValue={newSelectedValue}
            mobile={mobile}
            originalOptions= { newOriginalOptions}
          />
        )}
      </Header>
    </Layout>
  );
};

export default MobileStaff;

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
