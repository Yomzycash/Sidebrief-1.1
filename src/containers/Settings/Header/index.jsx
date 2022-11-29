import { Container, Heading, Top, SubHeader } from "./styles";
import { Search } from "./search";
import ActiveNav from "components/navbar/ActiveNav";

export const SettingHeader = () => {
	return (
		<Container>
			<Top>
				<Heading>Settings</Heading>
				<Search triggerSearch={() => {}} />
			</Top>
			<SubHeader>
				<ActiveNav text={"General"} path={`/dashboard/settings`} />
				<ActiveNav
					text={"Account"}
					path={`/dashboard/settings/account`}
				/>
				<ActiveNav
					text={"Security"}
					path={`/dashboard/settings/security`}
				/>
				<ActiveNav
					text={"Notification"}
					path={`/dashboard/settings/notification`}
				/>
				<ActiveNav
					text={"Others"}
					path={`/dashboard/settings/others`}
				/>
			</SubHeader>
		</Container>
	);
};
