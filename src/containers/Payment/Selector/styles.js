import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	display: flex;
	border-top: 1px solid #edf1f7;
	border-bottom: 1px solid #edf1f7;

	@media screen and (max-width: 600px) {
		border-bottom: none;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 20px;
		padding: 24px 48px;
	}
`;

export const PayProvide = styled.button`
	flex: 1;
	max-height: 80px;

	background: #fff;
	border: none;
	cursor: pointer;

	${({ active }) => (active ? ` background: #edf1f7;` : null)}

	@media screen and (max-width: 600px) {
		/* flex-wrap: wrap; */
		flex: none;
		/* max-width: 160px; */
		/* width: 100%; */
		height: 60px;
		border: 1px solid #edf1f7;
	}

	&:hover {
		background: #edf1f7;
	}

	img {
		height: 100%;
		max-width: 150px;
		width: 100%;
		object-fit: contain;
	}
`;
