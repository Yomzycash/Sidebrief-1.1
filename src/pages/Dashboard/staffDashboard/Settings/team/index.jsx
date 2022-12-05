import { Container, Top, Title, AddNew } from "./styles";
import { TeamTable } from "components/Staff/Tables";
import { mockData } from "./constants";

export default function SidebriefTeam() {
	return (
		<Container>
			<Top>
				<Title>Sidebrief Team</Title>
				<AddNew>Add New Member</AddNew>
			</Top>
			<TeamTable data={mockData} />
		</Container>
	);
}
