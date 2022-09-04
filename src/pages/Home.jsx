import React from "react";
import Button from "components/button";
import TagInput from "components/input/TagInput";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import TabNavBar from "components/TabNavBar/TabNavBar";
import Lendha from "asset/images/lendhaLogo.png";
import {
	EntityCard,
	LongCard,
	LongCardWrapper,
	EntityWrapper,
	RewardCard,
	StatusCard,
} from "components/cards";
// import { HeadText } from "components/texts";
// import { ApplicationTable } from "components/Tables";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { entities } from "data/entityType";

const Home = () => {
	const navigate = useNavigate();
	const handleClick = (link) => {
		navigate(`/${link}`);
	};

	return (
		<>
			<Navbar dashboard />
			<div style={{ flex: 4 }}>
				{/* <TabNavBar />
				<space>
					<TagInput />
				</space>
				<StatusCard /> */}
				{/* <CheckBox/> */}
			</div>

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
						{/* <LongCardWrapper>
							<LongCard
								title={"Launch"}
								body={
									"Start your business registration process with no paperwork."
								}
								action={() => console.log("test 1")}
							/>
							<LongCard
								title={"Shelf"}
								body={
									"Get pre-registered company in local markets."
								}
								notReady
								action={() => console.log("test 2")}
							/>
						</LongCardWrapper>
						<EntityWrapper>
							{entities.map((entity) => (
								<EntityCard
									key={entity.id}
									name={entity.name}
									price={entity.price}
									shortname={entity.shortname}
									company={entity.company}
									timeline={entity.timeline}
									shareholder={entity.shareholder}
									shares={entity.shares}
									type={entity.type}
									action={() =>
										console.log("this is an entity")
									}
								/>
							))}
						</EntityWrapper> */}
						{/* <RewardCard
							image={Lendha}
							imageAlt={"Lendha"}
							title={"Lendha Africa"}
							body={
								"Get credit to register your business & pay later."
							}
						/> */}
						<StatusCard
							name={"Sayochukwu Enterprise"}
							status={"awaiting"}
							shortDescription={
								"Cupcake ipsum dolor sit amet soufflé pudding cheesecake. Pie soufflé pie donut biscuit topping. Sugar plum croissant biscuit."
							}
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

const Horizontal = styled.div`
	display: flex;
	gap: 1.5rem;
	width: 100%;
`;
const space = styled.div`
	margin-bottom: 3rem;
`;
