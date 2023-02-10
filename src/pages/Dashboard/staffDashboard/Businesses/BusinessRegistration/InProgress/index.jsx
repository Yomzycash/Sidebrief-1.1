import { GeneralTable } from "components/Tables";
import React, { useEffect, useState } from "react";
import { useGetApprovedLaunchQuery } from "services/staffService";
import { Body, Container, Loading } from "./styled";
import { format } from "date-fns";
import { useGetAllCountriesQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { sortTableData } from "utils/staffHelper";
import { columns } from "../tableColumn";

const InProgress = () => {
	const [tableArr, setTableArr] = useState([]);
	const approvedLaunch = useGetApprovedLaunchQuery({
		refetchOnMountOrArgChange: true,
	});

	const countries = useGetAllCountriesQuery();

	useEffect(() => {
		if (approvedLaunch.isSuccess && countries.isSuccess) {
			setTableArr(approvedLaunch.data);
		}
	}, [approvedLaunch, countries.isSuccess]);

	console.log(tableArr);
	let sortArr = [...tableArr];
	let sortedArr = sortArr.sort(sortTableData);

	const loadingData = approvedLaunch.isLoading;

	return (
		<Container>
			<Body>
				{loadingData && (
					<Loading>
						<Puff stroke="#00A2D4" />
					</Loading>
				)}

				{sortedArr.length > 0 && (
					<GeneralTable
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
						columns={columns}
					/>
				)}
			</Body>
		</Container>
	);
};

export default InProgress;
