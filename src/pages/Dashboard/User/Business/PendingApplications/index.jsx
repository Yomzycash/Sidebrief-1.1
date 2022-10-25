import { BusinessTable } from "components/Tables";
import React, { useEffect, useState } from "react";
import { Body, Container, Loading } from "./styled";
import { format } from "date-fns";
import {
	useGetAllCountriesQuery,
	useGetUserSubmittedQuery,
} from "services/launchService";
import { Puff } from "react-loading-icons";

const PendingApplications = () => {
	const { data, error, isLoading, isSuccess } = useGetUserSubmittedQuery();

	const countries = useGetAllCountriesQuery();

	const [dataArr, setDataArr] = useState([]);
	useEffect(() => {
		if (isSuccess && countries.isSuccess) {
			setDataArr(data);
		}
	}, [data, isSuccess, countries.isSuccess]);
	return (
		<Container>
			<Body>
				{isLoading ? (
					<Loading>
						<Puff stroke="#00A2D4" />
					</Loading>
				) : dataArr.length > 0 ? (
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
					""
				)}
			</Body>
		</Container>
	);
};

export default PendingApplications;
