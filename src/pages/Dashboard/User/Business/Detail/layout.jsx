import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Container } from "./styles";

const BusinessDetailLayout = () => {
	return (
		<Container>
			<Header />
			<Outlet />
		</Container>
	);
};

export default BusinessDetailLayout;
