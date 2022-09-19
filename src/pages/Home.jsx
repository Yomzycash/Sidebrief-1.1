import React from "react";
import RewardModal from "components/modal/RewardModal";
import { BusinessTable } from "components/Tables";

const Home = () => {
	return (
		<BusinessTable
			data={[
				{
					name: "Sidebrief Africa",
					type: "LLC",
					objective: "science",
					country: "Nigeria",
					date: "28/07/2022",
				},
			]}
		/>
	);
};

export default Home;
