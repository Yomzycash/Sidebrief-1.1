import { Outlet, useSearchParams } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container } from "./styled";

const StaffBusinessDetailLayout = () => {
	const [searchParams] = useSearchParams();

	return (
		<Container>
			<Header isStaff code={searchParams.get("launchCode")} />
			<Body>
				<Outlet />
			</Body>
		</Container>
	);
};

export default StaffBusinessDetailLayout;
