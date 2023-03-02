import { Container, Item } from "./style";

export const SearchResult = ({ items }) => {
	return (
		<>
			{items.length > 0 && (
				<Container>
					{items.map((item, index) => (
						<Item key={index}>{item.name}</Item>
					))}
				</Container>
			)}
		</>
	);
};
