import { GeneralTable } from "components/Tables";
import React, { useEffect, useState, useMemo } from "react";
import { useGetSubmittedLaunchQuery } from "services/staffService";
import { Body, Container, Loading, EmptyContainer , MobileContainer} from "./styled";
import { format } from "date-fns";
import { useGetAllCountriesQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import { sortTableData } from "utils/staffHelper";
import { useMediaQuery } from "@mui/material";
import { staffNavigateToDetailPage } from "utils/globalFunctions";
import { useNavigate } from "react-router-dom";
import { columns } from "../tableColumn";
import Paginator from "components/Paginator";
import Accordion from "components/Accordion";

const Awaiting = () => {
	const [tableArr, setTableArr] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [currentItems, setCurrentItems] = useState([]);
	const awaitingLaunch = useGetSubmittedLaunchQuery();

	const navigate = useNavigate();
	
	const countries = useGetAllCountriesQuery();

	useEffect(() => {
		if (awaitingLaunch.isSuccess && countries.isSuccess) {
			setTableArr(awaitingLaunch.data);
		}
	}, [awaitingLaunch, countries.isSuccess]);

	const sortedArr = useMemo(() => {
		const sortArr = [...tableArr];
		return sortArr.sort(sortTableData);
	}, [tableArr]);

	const loadingData = awaitingLaunch.isLoading;

	const matches = useMediaQuery("(max-width:700px)");
	const itemsPerPage = 15;

	const handlePageClick = (e) => {
		const newOffset = (e.selected * itemsPerPage) % sortedArr?.length;
		setItemOffset(newOffset);
	};

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(sortedArr?.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(sortedArr?.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, sortedArr]);

	const MemoisedGeneralTable = useMemo(() => GeneralTable, [])

	return (
		<Container>
			<Body>
				{loadingData && (
					<Loading>
						<Puff stroke="#00A2D4" />
					</Loading>
				)}

				{!matches && sortedArr.length > 0 ? (
					<MemoisedGeneralTable
						data={currentItems.map((element) => {
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
				) : (
					<MobileContainer>
						{ currentItems.map((element) => {
							return (
								<Accordion
									key={element.launchCode}
									name={element.businessNames ? element.businessNames.businessName1 : "No name "}
									type={element?.registrationType}
									country={element?.registrationCountry}
									date={format(new Date(element.createdAt), "dd/MM/yyyy")}
									code={element.launchCode}
									countryISO={element.registrationCountry}
									navigate={(launchInfo) => staffNavigateToDetailPage(navigate, launchInfo)}
								/>
							)
						})}
					</MobileContainer>
				)}	

				{ 
					sortedArr.length === 0 && (
						<EmptyContainer>
							No Approved business yet
						</EmptyContainer>
					)
				}

				{sortedArr?.length > itemsPerPage && (
					<Paginator
						handlePageClick={handlePageClick}
						pageCount={pageCount}
					/>
				)}
			</Body>
		</Container>
	);
};

export default Awaiting;
