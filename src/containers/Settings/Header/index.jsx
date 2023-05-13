import { Container, Heading, Top, SubHeader } from "./styles";
import ActiveNav from "components/navbar/ActiveNav";
// import { Search } from "./search";
import { useLocation } from "react-router-dom";

export const SettingHeader = () => {
	const location = useLocation();

	const isPayment = location.pathname === "/dashboard/settings/payment";

	return (
		<Container curveBottom={isPayment}>
			<Top>
				<Heading>Profile</Heading>
				{/* <Search triggerSearch={() => {}} /> */}
			</Top>
			<SubHeader>
				<ActiveNav
					text={"Personal Information"}
					path={`/dashboard/settings/personal`}
				/>
				{/* <ActiveNav
					text={"Payments"}
					path={`/dashboard/settings/payment`}
				/> */}
			</SubHeader>
		</Container>
	);
};
