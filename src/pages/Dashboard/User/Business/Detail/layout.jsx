import { Outlet, useSearchParams } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container } from "./styles";

const BusinessDetailLayout = () => {
	const [searchParams] = useSearchParams();

	return (
		<Container>
			<Header code={searchParams.get("launchCode")} />
			<Body>
				<Outlet />
			</Body>
		</Container>
	);
};

export default BusinessDetailLayout;
