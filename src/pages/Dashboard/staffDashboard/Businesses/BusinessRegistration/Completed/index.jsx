import { StaffBusinessTable } from "components/Staff/Tables";
import React, { useEffect, useState } from "react";
import { useGetRejectedLaunchQuery } from "services/staffService";
import { Body, Container, Loading } from "./styled";
import { format } from "date-fns";
import { useGetAllCountriesQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { sortTableData } from "utils/staffHelper";
const Completed = () => {
	const [tableArr, setTableArr] = useState([]);
	const rejectedLaunch = useGetRejectedLaunchQuery({
		refetchOnMountOrArgChange: true,
	});

	const countries = useGetAllCountriesQuery();

	useEffect(() => {
		if (rejectedLaunch.isSuccess && countries.isSuccess) {
			setTableArr(rejectedLaunch.data);
		}
	}, [rejectedLaunch, countries.isSuccess]);


	let sortArr = [...tableArr];
	let sortedArr = sortArr.sort(sortTableData);

	const loadingData = rejectedLaunch.isLoading;

	return (
		<Container>
			<Body>
				{loadingData && (
					<Loading>
						<Puff stroke="#00A2D4" />
					</Loading>
				)}

				{sortedArr.length > 0 && (
					<StaffBusinessTable
						data={sortedArr.map((element) => {
							return {
								name: element.businessNames
									? element.businessNames.businessName1
									: "No name ",
								type: element?.registrationType,
								country: element.registrationCountry,
								date: format(
									new Date(element.createdAt),
									"dd/MM/yyyy"
								),
								code: element.launchCode,
								countryISO: element.registrationCountry,
							};
						})}
					/>
				)}
			</Body>
		</Container>
	);
};

export default Completed;
