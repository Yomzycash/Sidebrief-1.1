import { BusinessTable } from "components/Tables";
import React, { useEffect, useState } from "react";
import { Body, Container, Loading } from "./styled";
import { format, compareDesc } from "date-fns";
import {
	useGetAllCountriesQuery,
	useGetUserSubmittedQuery,
} from "services/launchService";
import { Puff } from "react-loading-icons";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import BusinessesCard from "components/cards/BusinessAddressCard";

const PendingApplications = () => {
	const { data, error, isLoading, isSuccess } = useGetUserSubmittedQuery();

	const countries = useGetAllCountriesQuery();

	const [dataArr, setDataArr] = useState([]);
	useEffect(() => {
		if (isSuccess && countries.isSuccess) {
			const response = [...data];
			response.sort((launch1, launch2) => {
				return compareDesc(
					new Date(launch1.updatedAt),
					new Date(launch2.updatedAt)
				);
			});
			setDataArr(response);
		}
	}, [data, isSuccess, countries.isSuccess]);
	const matches = useMediaQuery("(max-width:700px)");

	return (
		<Container>
			<Body>
				{isLoading && (
					<Loading>
						<Puff stroke="#00A2D4" />
					</Loading>
				)}
				{!matches && dataArr.length > 0 ? (
					<BusinessTable
						data={dataArr.map((element) => {
							return {
								name: element.businessNames
									? element.businessNames.businessName1
									: "No name ",
								type: element?.registrationType,
								country: countries.data.find(
									(country) =>
										country.countryISO ===
										element.registrationCountry
								).countryName,
								date: format(
									new Date(element.updatedAt),
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
			</Body>
		</Container>
	);
};

export default PendingApplications;
const MobileContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: inherit;
	width: 100%;
	align-items: center;
	justify-content: center;

	gap: 8px;
`;
