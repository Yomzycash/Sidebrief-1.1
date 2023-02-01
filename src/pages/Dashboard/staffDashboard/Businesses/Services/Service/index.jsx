import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import { ReactComponent as ChatIcon } from "asset/Icons/ChatIcon.svg";
import { Puff } from "react-loading-icons";
import { ReactComponent as ArrowLeftIcon } from "asset/Icons/ArrowLeftIcon.svg";
import { ReactComponent as AddIcon } from "asset/Icons/AddIcon.svg";
import Search from 'components/navbar/Search'

import { useGetAllServicesQuery } from 'services/staffService';

import FeatureSection from 'containers/Feature/FeatureSection';
import FeatureTable from 'components/Tables/FeatureTable';

import DownloadIcon from "asset/Icons/DownloadIcon";
import CopyIcon from "asset/Icons/CopyIcon";
import { IoMdMore } from "react-icons/io";
// import lookup from "country-code-lookup"
import PetalsCard from 'components/cards/RewardCard/PetalsCard';
import { ScrollBox } from 'containers';

const lookup = require('country-code-lookup');
const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  width: "100%",
  height: "100%",
};

const countryCodes = {
  KEN: 'Kenya',
  NGN: 'Nigeria'
};

const DisplayCountry = ({ shortcode }) => {
  return <p>{countryCodes[shortcode]} </p>
}
const iconStyle = { width: "17px", height: "17px" };

const ServicePage = ({}) => {
  const { data, isLoading } = useGetAllServicesQuery();

  const [servicesEnquiry, setServicesEnquiry] = useState([]);

  const header = ["Name", "Request ID", "Status", "Country", "Date"];

  const itemStyles = {
    item1: { color: 'red', backgroundColor: 'yellow', category: "TAX", },
    item2: { color: 'blue', backgroundColor: 'green',  category: "MANAGE", },
  };


  let exampleData = [
    "Ayomide Constructions & Sons",
    "Chiazor A",
    "Opeyemi P.",
    "Osamudien",
    "Rashhed",
    "Lola",
  ];
  const dataBody = exampleData.map((el) => [
    el,
    <div>
      3399449933
    </div>,
    <div>
      New Request
    </div>,
    <div>
       Nigeria
    </div>,
     <div>
      27/02/2023
    </div>,
     <div onClick={(e) => console.log(e)}>
     <ChatIcon size={20} />
     <span style={{ color: "#00A2D4" }}>Resolve</span>
   </div>,
  ]);

  

  useEffect(() => {
    setServicesEnquiry(data);
  }, [data])


  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>
                Services
              </PageTitle>
            </div>
            <SearchWrapper>
                <Search style={searchStyle} iconStyle={iconStyle} placeholder="Search for a service"/>
            </SearchWrapper>
          </TopContent>
         
        </MainHeader>
      </Header>

      <br/>
      <FeatureSection
        title={"Services" + " (" + servicesEnquiry?.length + ")" + " available"}
        subText="Select all available banks to create an account with"
        // LeftbtnLeftIcon={AddIcon}
        btnText="View all"
        btnRightIcon={ArrowLeftIcon}
      >
        <div style={{padding:"34px 25px 34px 24px"}}>
          {isLoading ? (
               <Loading height="300px">
               <Puff stroke="#00A2D4" fill="white" width={60} />
             </Loading>
          ) : (
            <ScrollBox>
            {servicesEnquiry && servicesEnquiry.map((service, index) => (
                <PetalsCard 
                  key={index}
                  service
                  message={service?.serviceName}
                  badge={service?.serviceCategory}
                  subText={service?.serviceCountry}
                  // subText={lookup.byIso.name("NGN")}
                />
            ))}
          </ScrollBox>
          )}
         
        </div>
       
      </FeatureSection>
      <br/><br/>

      <FeatureSection
        title="Service Requests"
        subText="View and create bank accounts for all registered businesses"
        btnText="View all"
        btnRightIcon={ArrowLeftIcon}
      >
        <FeatureTable header={header} body={dataBody} />
      </FeatureSection>
      
    </Container>
  )
}

export default ServicePage

const Container = styled.div`
  display:flex;
  flex-flow:column;
  flex:1;
  margin:0 40px;

  @media screen and (max-width: 1050px){
    margin:0
  }
`;

const Header = styled.div`
  position:sticky;
  top:57.1px;
  display:flex;
  flex-flow:column;
  background-color:white;
  z-index:2

  @media screen and (max-width:700px) {
    flex-flow: column-reverse;
  }
`

const MainHeader = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 40px 0px;
  gap: 24px;
  /* height: clamp(80px, 10vw, 150px); */
  border: 1px solid #edf1f7;
  border-top: none;
  transition: 0.2s all ease;
  @media screen and (max-width: 700px) {
    padding: 16px 24px 32px 24px !important;
  }
`

const SubHeader = styled.div`
  display: flex;
  height: clamp(48px, 10vw, 58px);
  gap: 24px;
  border: 1px solid #edf1f7;
  border-top: none;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`
const TopContent = styled.div`
  display: flex;
  /* gap: 48px; */
  align-items: center;
  padding-inline: 24px;
  flex: 1;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 48px;
    justify-content: space-between;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: clamp(20px, 2vw, 24px);
  font-weight: 700;
  color: #151717;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  max-width: 384px;
  height: 40px;
  width: 100%;
  @media screen and (max-width: 700px) {
    max-width: 100%;
    width: 100%;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;

// const searchStyle = styled.div`
//   border-radius: 12px;
//   background-color: "white";
//   max-width: 384px;
//   height: 40px;
//   @media screen and (max-width: 700px) {
//     width: 100%;
//   }
// `;


