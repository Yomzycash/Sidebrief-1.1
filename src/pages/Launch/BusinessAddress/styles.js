import styled from "styled-components";

export const Page = styled.div`
	padding-block: 32px;
	padding-inline: 8%;
`;

export const InputWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, minmax(350px, 1fr));
	gap: 20px;

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;
