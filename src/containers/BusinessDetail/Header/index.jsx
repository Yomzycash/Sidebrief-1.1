import {
	Container,
	BackContainer,
	Text,
	Top,
	TitleContainer,
	TopInfo,
	CompanyName,
	LHS,
	RHS,
	BottomInfo,
	UserName,
	DotSeperator,
	DateText,
	DeleteButton,
	SubHeader,
	SearchAndSort,
} from "./styles";
import { FiArrowLeft } from "react-icons/fi";
import { StatusIndicator } from "components/Indicators";
import { RedTrash } from "asset/svg";
import ActiveNav from "components/navbar/ActiveNav";
// import Search from "components/navbar/Search";
import { Search } from "./Search";
import { useState } from "react";

export const Header = ({ deleteAction, searchAndSort }) => {
	// const [searchTerm, setSearchTerm] = useState("");

	const triggerSearch = (query) => {};

	return (
		<Container>
			<Top>
				<BackContainer to="/dashboard/businesses">
					<FiArrowLeft color="#151717" size={24} />
					<Text>Back to Applications</Text>
				</BackContainer>
				<TitleContainer>
					<LHS>
						<TopInfo>
							<CompanyName>
								Ayomide Construction and Husbands
							</CompanyName>
							{/* Status */}
							<StatusIndicator
								status={{
									text: "In progress",
									color: "#FFBF29",
								}}
							/>
							{/* Type */}
							<StatusIndicator
								status={{
									text: "L.L.C",
									color: "#00A2D4",
								}}
							/>
						</TopInfo>
						<BottomInfo>
							<UserName>Ayomide Olopade</UserName>
							<DotSeperator />
							<DateText>28th August 2022</DateText>
						</BottomInfo>
					</LHS>
					<RHS>
						<DeleteButton onClick={deleteAction}>
							<p>Delete</p>
							<RedTrash />
						</DeleteButton>
					</RHS>
				</TitleContainer>
			</Top>
			<SubHeader>
				<ActiveNav
					text={"Business Information"}
					// total={0}
					path={"/test"}
				/>
				<ActiveNav
					text={"Shareholders"}
					total={0}
					path={"/test/shareholders"}
				/>
				<ActiveNav
					text={"Directors"}
					total={0}
					path={"/test/directors"}
				/>
				<ActiveNav
					text={"Beneficiaries"}
					total={0}
					path={"/test/beneficiaries"}
				/>
			</SubHeader>
			{searchAndSort ? (
				<SearchAndSort>
					{/* placeholder changes based on the page it's on */}
					{/* not implemented yet */}
					<Search triggerSearch={triggerSearch} />
					{/* Sort should be here */}
				</SearchAndSort>
			) : null}
		</Container>
	);
};
