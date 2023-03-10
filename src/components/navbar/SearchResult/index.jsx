import { Container, Item, InvisibleBackDrop } from "./style";

export const SearchResult = ({ items, show, onItemClick, unShow }) => {
	return (
		<>
			{items.length > 0 && show && (
				<>
					<InvisibleBackDrop onClick={unShow} />
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
				</>
			)}
		</>
	);
};
