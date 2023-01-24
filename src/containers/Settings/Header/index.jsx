import { Container, Heading, Top, SubHeader } from "./styles";
import { Search } from "./search";
import ActiveNav from "components/navbar/ActiveNav";

export const SettingHeader = () => {
	return (
		<Container>
			<Top>
				<Heading>Profile</Heading>
				{/* <Search triggerSearch={() => {}} /> */}
			</Top>
			<SubHeader>
				<ActiveNav
					text={"Personal Information"}
					path={`/dashboard/settings/personal`}
				/>
				<ActiveNav
					text={"Payments"}
					path={`/dashboard/settings/payment`}
				/>
			</SubHeader>
		</Container>
	);
};
