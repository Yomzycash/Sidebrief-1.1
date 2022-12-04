import { Outlet, useNavigate } from "react-router-dom";
import { StaffSettingHeader } from "containers/Settings";
import { LayoutBody, LayoutContainer, Container } from "./styled";
import { Body, BodyLeft, BodyRight } from "../index";
import StaffSidebar from "components/sidebar/StaffSidebar";
import Navbar from "components/navbar";

const StaffSettingsLayout = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<Navbar
				dashboard
				imgStyles={{ maxWidth: "100px" }}
				style={{ padding: "12px 24px" }}
			/>
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
		</Container>
	);
};

export default StaffSettingsLayout;
