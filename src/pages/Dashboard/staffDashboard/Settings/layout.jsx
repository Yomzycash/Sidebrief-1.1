import { Outlet, useNavigate } from "react-router-dom";
import { StaffSettingHeader } from "containers/Settings";
import { LayoutBody, LayoutContainer } from "./styled";
import { Body, BodyLeft, BodyRight } from "../index";
import StaffSidebar from "components/sidebar/StaffSidebar";

const StaffSettingsLayout = () => {
	const navigate = useNavigate();

	return (
		<Body>
			<BodyLeft>
				<StaffSidebar />
			</BodyLeft>

			<LayoutContainer>
				<StaffSettingHeader />
				<LayoutBody>
					<Outlet />
				</LayoutBody>
			</LayoutContainer>
		</Body>
	);
};

export default StaffSettingsLayout;
