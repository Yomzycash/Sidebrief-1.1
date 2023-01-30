import { Container, Head, Heading, DropDown, SearchContainer } from "./style";
import numeral from "numeral";
import Search from "components/navbar/Search";

export const Chats = () => {
	return (
		<Container>
			<Head>
				<Heading>Chats ({numeral(2002).format("0,0")})</Heading>
				<DropDown>Filter by</DropDown>
			</Head>
			<SearchContainer>
				<Search />
			</SearchContainer>
		</Container>
	);
};
