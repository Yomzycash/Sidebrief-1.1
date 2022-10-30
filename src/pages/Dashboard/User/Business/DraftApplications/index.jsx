import { BusinessTable } from "components/Tables";
import React, { useEffect } from "react";
import { useState } from "react";
import {
	useGetAllCountriesQuery,
	useGetUserDraftQuery,
} from "services/launchService";
import { Body, Container, Loading } from "./styled";
import { format, compareDesc } from "date-fns";
import { Puff } from "react-loading-icons";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";
import styled from "styled-components";

const DraftApplications = () => {
	const { data, error, isLoading, isSuccess } = useGetUserDraftQuery();

	const countries = useGetAllCountriesQuery();

	const [dataArr, setDataArr] = useState([]);
	useEffect(() => {
		if (isSuccess && countries.isSuccess) {
			const response = [...data];
			response.sort((launch1, launch2) => {
				return compareDesc(
					new Date(launch1.createdAt),
					new Date(launch2.createdAt)
				);
			});
			setDataArr(response);
		}
	}, [data, isSuccess, countries.isSuccess]);
	const matches = useMediaQuery("(max-width:700px)");

	return (
		<Container>
			<Body>
				{isLoading ||
					(countries.isLoading && (
						<Loading>
							<Puff stroke="#00A2D4" />
						</Loading>
					))}
				{!matches && dataArr.length > 0 ? (
					<BusinessTable
						data={dataArr.map((element) => {
							return {
								name: element.businessNames
									? element.businessNames.businessName1
									: "No name ",
								type: element?.registrationType,
								country: countries?.data?.find(
									(country) =>
										country.countryISO ===
										element.registrationCountry
								).countryName,
								date: format(
									new Date(element.createdAt),
									"dd/MM/yyyy"
								),
								code: element.launchCode,
								countryISO: element.registrationCountry,
							};
						})}
					/>
				) : (
					<MobileContainer>
						{dataArr.map((element) => {
							return (
								<BusinessesCard
									name={
										element.businessNames
											? element.businessNames
													.businessName1
											: "No name "
									}
									type={element?.registrationType}
									code={element?.launchCode}
									countryISO={element?.registrationCountry}
								/>
							);
						})}
					</MobileContainer>
				)}
				{error?.status === "FETCH_ERROR" ||
				countries?.isLoading === "FETCH_ERROR" ? (
					<p>Please check your internet connection</p>
				) : (
					""
				)}
				{/* {console.log(countries.isError)} */}
			</Body>
		</Container>
	);
};

export default DraftApplications;

const MobileContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: inherit;
	width: 100%;
	align-items: center;
	justify-content: center;

	gap: 8px;
`;
