import { Container, Item, InvisibleBackDrop, NoResultContainer } from "./style";

export const SearchResult = ({ items, show, searchResult, onItemClick, unShow }) => {
	const searchResults = searchResult?.trim().length > 0;
	return (
		<>
			{show && searchResults && (
				<>
					<InvisibleBackDrop onClick={unShow} />
					{items.length > 0 ? (
						<Container>
							{items.map((item) => (
								<Item
									key={item.id}
									onClick={() => onItemClick(item)}
								>
									{item.name}
								</Item>
							))}
						</Container>
					): (
						<NoResultContainer>
							<p>No results found</p>
						</NoResultContainer>
					)}
					
				</>
			)}
		</>
	);
};
