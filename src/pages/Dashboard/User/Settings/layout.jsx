import { Outlet } from "react-router-dom";
import { SettingHeader } from "containers/Settings";
import { LayoutBody, LayoutContainer } from "./styled";
import { useEffect } from "react";
import { store } from "redux/Store";
import { setRefreshApp } from "redux/Slices";
import { useSelector } from "react-redux";

const SettingsLayout = () => {
  const { refreshApp } = useSelector((store) => store.UserDataReducer);

  useEffect(() => {
    store.dispatch(setRefreshApp(!refreshApp));
  }, []);

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
