import React, { useRef, useState } from "react";
import Navbar from "components/navbar";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import StaffSidebar from "components/sidebar/StaffSidebar";
import StaffHeader from "components/Header/StaffHeader";
import { CountryCardDetails } from "utils/config";
import CountryCard from "components/cards/CountryCard";
import {
  useAddCountryMutation,
  useGetAllCountriesQuery,
} from "services/staffService";
import { Puff } from "react-loading-icons";
import StaffEntityModal from "components/modal/StaffEntityModal";
import { handleError } from "utils/globalFunctions";
import { useEffect } from "react";
import StaffCountryModal from "components/modal/StaffCountryModal";

const Countries = () => {
  const [open, setOpen] = useState(false);
  const [cardAction, setCardAction] = useState("");

  // Exchange information with the backend
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetAllCountriesQuery();

  const navigate = useNavigate();
  const location = useLocation();

  // Get information from the store
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  let hideSearch = location.pathname.includes("/dashboard/rewards");

  const handleAddButton = () => {
    setOpen(true);
    console.log();
    setCardAction("add");
  };

  let errorRef = useRef(true);
  useEffect(() => {
    if (isError && errorRef.current === true) {
      handleError(error);
      errorRef.current = false;
    }
  }, []);

  return (
    <Container SidebarWidth={sidebarWidth}>
      <StaffHeader
        handleButton={handleAddButton}
        shown={data?.length}
        total={data?.length}
        loading={isLoading}
      />
      <CardContainer>
        <CardWrapper>
          {isLoading ? (
            <Loader>
              <Puff stroke="#00A2D4" fill="white" />
            </Loader>
          ) : (
            data?.map((country, index) => (
              <CountryCard
                key={index}
                image={`https://countryflagsapi.com/png/${country.countryISO.toLowerCase()}`}
                name={country.countryName}
                countryCode={country.countryISO}
                countryNumber={country.countryCode}
                countryCurrency={country.countryCurrency}
                action={() => {
                  navigate(
                    `/staff-dashboard/businesses/countries/${country.countryISO}/detail`
                  );
                }}
              />
            ))
          )}
          <StaffCountryModal
            open={open}
            setOpen={setOpen}
            loading={isLoading}
            cardAction={cardAction}
          />
        </CardWrapper>
      </CardContainer>
    </Container>
  );
};

export default Countries;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  /* width: calc(100% - ${({ SidebarWidth }) => SidebarWidth}); */
  padding-bottom: 40px;
`;
const CardContainer = styled.div`
  border: 1px solid #edf1f7;
  border-top: 0;
  margin: 0 40px;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
  height: 100%;
  padding-inline: 24px;
  padding-block: 40px;
`;
const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 24px;
  @media screen and (min-width: 1600px) {
    grid-template-columns: auto auto auto auto;
    gap: 24px;
  }
`;

const Loader = styled.div`
  grid-column: 1/4;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100px;
`;
