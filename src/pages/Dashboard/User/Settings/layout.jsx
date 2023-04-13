import { Outlet } from "react-router-dom";
import { SettingHeader } from "containers/Settings";
import { LayoutBody, LayoutContainer } from "./styled";

const SettingsLayout = () => {
  return (
    <LayoutContainer>
      <SettingHeader />
      <LayoutBody>
        <Outlet />
      </LayoutBody>
    </LayoutContainer>
  );
};

export default SettingsLayout;
