import { Container, Heading, Top, SubHeader } from "./styles";
import ActiveNav from "components/navbar/ActiveNav";
// import { Search } from "./search";

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
