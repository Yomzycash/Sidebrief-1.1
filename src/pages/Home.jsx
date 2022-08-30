import Button from "components/button";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import TabNavBar from "components/TabNavBar/TabNavBar";
import { HeadText } from "components/texts";
import React from "react";
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
      <TabNavBar/>
    
          
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
