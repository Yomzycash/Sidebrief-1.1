import {React, useEffect, useState, useMemo } from "react";
import {
	Container,
	Header,
	MainHeader,
	TopContent,
	PageTitle,
	Drop,
	BottomContent,
	Flex,
	SearchWrapper,
	SubHeader,
	TitleWrapper,
} from "./styled";
import { useGetAllServicesQuery } from "services/complyService"
import { SummaryCard } from "components/cards";
import Search from "components/navbar/Search";
import { ReactComponent as AddIcon } from "asset/svg/AddWhite.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import FeatureTable from "components/Tables/FeatureTable";
import { sortTableData } from "utils/staffHelper";
import Paginator from "components/Paginator";
import CheckBox from "components/input/Checkbox2"

const UserService = () => {
	const [tableArr, setTableArr] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [currentItems, setCurrentItems] = useState([]);
	// const { data, isLoading, refetch } = useGetAllServicesQuery();
	const myService = useGetAllServicesQuery();
	const allService = myService?.data
	const sortedArr = useMemo(() => {
		const sortArr = [...tableArr];
		return sortArr.sort(sortTableData);
	}, [tableArr])

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
	console.log("sortedArr", sortedArr)
	// Table header information
	const header = ["Service Name", "Type", "Country", "Date"];
	
	console.log("services", allService)
	// Table row information
	const serviceBody = allService?.map((service) => [
		service?.serviceName,
		service?.serviceCategory,
		service?.serviceCountry,
		service?.createdAt?.split("T")[0]
	])
	

	// console.log("serviceBody", serviceBody )
	return (
		<Container>
			<Header>
				<MainHeader>
					<TopContent>
						<div>
							<PageTitle>Services</PageTitle>
							<SummaryCard shown={9} total={30} />
						</div>
						<Drop>
							<select>
								<option value="Sort">Sort</option>
								<option value="All">All</option>
							</select>
						</Drop>
					</TopContent>
					<BottomContent>
						<SearchWrapper>
							<Search className={"searchbox"} placeholder={"Seach for a service"} />
						</SearchWrapper>
					</BottomContent>

					<FeatureTable header={header} body={serviceBody}/>
					
				</MainHeader>
				{/* {sortedArr?.length > itemsPerPage && (
					<Paginator
						handlePageClick={handlePageClick}
						pageCount={pageCount}
					/>
				)} */}
			</Header>
			<Outlet />
		</Container>
	);
};

export default UserService;
