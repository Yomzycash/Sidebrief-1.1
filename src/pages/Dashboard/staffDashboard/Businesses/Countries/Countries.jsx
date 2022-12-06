import React from "react";
import Navbar from "components/navbar";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import StaffSidebar from "components/sidebar/StaffSidebar";
import StaffHeader from "components/Header/StaffHeader";
import { CountryCardDetails } from "utils/config";
import CountryCard from "components/cards/CountryCard";
import { useGetAllCountriesQuery } from "services/staffService";
import { Puff } from "react-loading-icons";

const Countries = () => {
	const layoutInfo = useSelector((store) => store.LayoutInfo);
	const { sidebarWidth } = layoutInfo;
	const navigate = useNavigate();
	const location = useLocation();
	const { data, isLoading } = useGetAllCountriesQuery();

	let hideSearch = location.pathname.includes("/dashboard/rewards");

	if (!isLoading) {
		console.log(data);
	}

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
					<StaffHeader />
					<CardContainer>
						<CardWrapper>
							{isLoading ? (
								<Loader>
									<Puff stroke="#00A2D4" fill="white" />
								</Loader>
							) : (
								data.map((country, index) => (
									<CountryCard
										key={country.id}
										image={country.flag}
										name={country.countryName}
										countryCode={country.countryISO}
										countryNumber={country.countryCode}
										countryCurrency={
											country.countryCurrency
										}
										action={() => {
											navigate(
												"/staff-dashboard/businesses/countries/countrydetail"
											);
										}}
									/>
								))
							)}
						</CardWrapper>
					</CardContainer>
				</BodyRight>
			</Body>
		</Dashboard>
	);
};

export default Countries;
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
const CardContainer = styled.div`
	border: 1px solid #edf1f7;
	border-top: 0;
	margin: 0 40px;
	width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
	height: 100%;
	padding-inline: 24px;
	padding-block: 40px;
`;
const CardWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: auto auto auto;
	gap: 24px;
	@media screen and (min-width: 1600px) {
		grid-template-columns: auto auto auto auto;
		gap: 24px;
	}
`;

const Loader = styled.div`
	display: grid;
	place-items: center;
	width: 100%;
	height: 100px;
`;
