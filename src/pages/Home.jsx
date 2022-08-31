import React from "react";
import Button from "components/button";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import TabNavBar from "components/TabNavBar/TabNavBar";
import { EntityCard } from "components/cards";
import { HeadText } from "components/texts";
import { ApplicationTable } from "components/Tables";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
	const navigate = useNavigate();
	const handleClick = (link) => {
		navigate(`/${link}`);
	};

	return (
		<>
			<Navbar dashboard />

			<div style={{ display: "flex" }}>
				<Sidebar />
				<div style={{ flex: 4 }}>
					<TabNavBar />
					{/* Testing div */}
					<div
						style={{
							padding: "2rem",
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
						}}
					>
						{/* <EntityCard
							entityInfo={{
								"Entity Name": "Limited Liability Company",
								"Entity shortname": "LLC",
								"Entity Type": "Private Company",
								"Entity Fee": "#15000",
								"Entity Description": "Local Shareholders only",
								"Entity TimeLine": "30 days",
								"Entity Requirements": "Standard",
								"Entity Shares": "10000 Shares",
							}}
							action={() => console.log("I am an Entity")}
						/> */}
						<ApplicationTable
							onClickViewAll={() => {
								console.log("You want to view?");
								console.log("No view for you");
							}}
						/>
					</div>
				</div>
			</div>

			{/* <Homepage>
        <HeadText
          title="Sidebrief Homepage"
          body="Hey! Welcome to home page. Here, you get to see basic information about
      sidebrief."
          align="flex-start"
        />
        <Register>
          <Button title="Register" onClick={() => handleClick("register")} />
          <Button title="Login" onClick={() => handleClick("login")} />
        </Register>
      </Homepage> */}
		</>
	);
};

export default Home;

const Homepage = styled.div`
	display: flex;
	flex-flow: column;
	gap: 3rem;
	padding: 2rem clamp(1rem, 5%, 3rem);
`;

const Register = styled.div`
	display: flex;
	flex-flow: row wrap;
	gap: 1rem;
	max-width: 400px;
`;
