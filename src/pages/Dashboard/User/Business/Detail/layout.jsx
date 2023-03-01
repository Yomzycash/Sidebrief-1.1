import { Outlet } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container } from "./styles";

const BusinessDetailLayout = () => {
	return (
		<Container>
			<Header />
			<Body>
				<Outlet />
			</Body>
		</Container>
	);
};

export default BusinessDetailLayout;
