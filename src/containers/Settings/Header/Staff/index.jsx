import { Container, Heading, Top, SubHeader } from "../styles";
import { Search } from "../search";
import ActiveNav from "components/navbar/ActiveNav";

export const StaffSettingHeader = () => {
	return (
		<Container>
			<Top>
				<Heading>Settings</Heading>
				<Search triggerSearch={() => {}} />
			</Top>
			<SubHeader>
				<ActiveNav
					text={"General Details"}
					path={`/staff-dashboard/settings/general`}
				/>
				<ActiveNav
					text={"Notifications"}
					path={`/staff-dashboard/settings/notification`}
				/>
				<ActiveNav
					text={"User permissions"}
					path={`/staff-dashboard/settings/user-permissions`}
				/>
				<ActiveNav
					text={"Sidebrief Teams"}
					path={`/staff-dashboard/settings/team`}
				/>
			</SubHeader>
		</Container>
	);
};
