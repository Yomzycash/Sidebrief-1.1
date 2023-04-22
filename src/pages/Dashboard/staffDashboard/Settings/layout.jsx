import { Outlet, useNavigate } from "react-router-dom";
import { StaffSettingHeader } from "containers/Settings";
import { LayoutBody, LayoutContainer, Container } from "./styled";
import StaffSidebar from "components/sidebar";
import Navbar from "components/navbar";

const StaffSettingsLayout = () => {
  const navigate = useNavigate();

  return (
    <LayoutContainer>
      <StaffSettingHeader />
      <LayoutBody>
        <Outlet />
      </LayoutBody>
    </LayoutContainer>
  );
};

export default StaffSettingsLayout;
