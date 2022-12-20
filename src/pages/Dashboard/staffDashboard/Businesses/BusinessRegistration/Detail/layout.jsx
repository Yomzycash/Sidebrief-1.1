import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container } from "./styled";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const StaffBusinessDetailLayout = () => {
	const navigate = useNavigate();
	const { code } = useParams();
	const launchData = useSelector(
		(store) => store.LaunchReducer.launchResponse
	);

	// might need some more work
	useEffect(() => {
		if (code !== launchData.launchCode) {
			navigate(-1);
		}
	}, [code, launchData, navigate]);

	return (
		<Container>
			<Header isStaff />
			<Body>
				<Outlet />
			</Body>
		</Container>
	);
};

export default StaffBusinessDetailLayout;
