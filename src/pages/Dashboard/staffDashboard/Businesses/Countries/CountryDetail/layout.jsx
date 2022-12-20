import HeaderDetail from "components/Header/HeaderDetail";
import Navbar from "components/navbar";
import StaffSidebar from "components/sidebar/StaffSidebar";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const CountryDetailLayout = (pages) => {
	const layoutInfo = useSelector((store) => store.LayoutInfo);
	const { sidebarWidth } = layoutInfo;
	const { pathname } = useLocation();

	const page = pathname.split("/").pop();

	return (
		<Dashboard>
			<Navbar
				dashboard
				imgStyles={{ maxWidth: "100px" }}
				style={{ padding: "12px 24px" }}
				hideSearch
			/>
			<Body>
				<BodyLeft>
					<StaffSidebar />
				</BodyLeft>
				<BodyRight SidebarWidth={sidebarWidth}>
					<Container>
						<HeaderDetail />
						<DetailBody>
							<Outlet />
						</DetailBody>
					</Container>
				</BodyRight>
			</Body>
		</Dashboard>
	);
};

export default CountryDetailLayout;
const Dashboard = styled.div`
	display: flex;
	flex-flow: column;
	width: 100%;
	flex: 1;
`;
const Body = styled.div`
	display: flex;
	flex-flow: row nowrap;
`;
const BodyLeft = styled.div``;

const BodyRight = styled.div`
	display: flex;
	flex-flow: column;
	width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
	padding-bottom: 40px;
`;

const Container = styled.div`
	padding-inline: clamp(0px, 2vw, 40px);
	display: flex;
	flex-direction: column;
	/* gap: 40px; */
	padding-bottom: 40px;
	height: max-content;
	width: 100%;

	@media screen and (max-width: 700px) {
		padding-inline: 0;
		gap: 24px;
	}
`;
const OtherContainer = styled.div`
	padding-inline: clamp(0px, 2vw, 40px);
	display: flex;
	flex-direction: column;
	gap: 0px;
	padding-bottom: 40px;
	height: max-content;
	width: 100%;

	@media screen and (max-width: 700px) {
		padding-inline: 0;
		gap: 24px;
	}
`;

const DetailBody = styled.div`
	width: 100%;

	@media screen and (max-width: 700px) {
		padding-inline: 24px;
	}
`;
