import React from "react";
import Button from "components/button";
import TagInput from "components/input/TagInput";
import StatusCard from "components/cards/StatusCard/StatusCard";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import TabNavBar from "components/TabNavBar/TabNavBar";
import { EntityCard, LongCard } from "components/cards";
// import { HeadText } from "components/texts";
// import { ApplicationTable } from "components/Tables";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import  CheckBox  from "mui/icons-material";
// import { MockData } from "components/Tables/ApplicationTable/constants";

const Home = () => {
	const navigate = useNavigate();
	const handleClick = (link) => {
		navigate(`/${link}`);
	};

	return (
		<>
			<Navbar dashboard />

        
        <div style={{ flex: 4 }}>
      <TabNavBar/>
      <space><TagInput/>
      </space>

      <StatusCard/>

      {/* <CheckBox/> */}
    
          
        </div>
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
					></div>
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
`