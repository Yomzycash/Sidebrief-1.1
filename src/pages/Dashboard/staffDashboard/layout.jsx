import styled from "styled-components";
import StaffSidebar from "components/sidebar/StaffSidebar";
import Navbar from "components/navbar";
import MobileNavbar from "components/navbar/MobileNavbar";
import { useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";

const StaffLayout = () => {
	const layoutInfo = useSelector((store) => store.LayoutInfo);
	const { sidebarWidth } = layoutInfo;

	const location = useLocation();

	let hideMobileNav =
		location.pathname.includes("/dashboard/rewards") &&
		location.pathname.length > 31;

	return (
		<Dashboard>
			<Navbar
				dashboard
				imgStyles={{ maxWidth: "100px" }}
				style={{ padding: "12px 24px" }}
			/>
			<MobileNavbar hideNav={hideMobileNav} />
			<Body>
				<BodyLeft>
					<StaffSidebar />
				</BodyLeft>
				<BodyRight SidebarWidth={sidebarWidth}>
					<Outlet />
				</BodyRight>
			</Body>
		</Dashboard>
	);
};

export default StaffLayout;

export const Dashboard = styled.div`
	display: flex;
	flex-flow: column;
	width: 100%;
	flex: 1;
`;

export const Body = styled.div`
	display: flex;
	flex-flow: row nowrap;
`;

export const BodyLeft = styled.div``;

export const BodyRight = styled.div`
	display: flex;
	flex-flow: column;
	width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});

	@media screen and (max-width: 700px) {
		width: 100%;
	}
`;
