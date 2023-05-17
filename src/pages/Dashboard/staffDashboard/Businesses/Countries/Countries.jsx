import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StaffHeader from "components/Header/StaffHeader";
import CountryCard from "components/cards/CountryCard";
import { useAddCountryMutation, useGetAllCountriesQuery } from "services/staffService";
import { Puff } from "react-loading-icons";
import { handleError } from "utils/globalFunctions";
import { useEffect } from "react";
import StaffCountryModal from "components/modal/StaffCountryModal";
import { toast } from "react-hot-toast";
import lookup from "country-code-lookup";
import flags from "./flags";

const Countries = () => {
  const [open, setOpen] = useState(false);
  const [cardAction, setCardAction] = useState("");

  // Exchange information with the backend
  const { data, isLoading, isError, error, refetch } = useGetAllCountriesQuery();
  const [addCountry, addState] = useAddCountryMutation();

  const navigate = useNavigate();
  // const location = useLocation();

  // Get information from the store
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  // let hideSearch = location.pathname.includes("/dashboard/rewards");

  const handleAddButton = () => {
    setOpen(true);
    setCardAction("add");
  };

  let errorRef = useRef(true);

  useEffect(() => {
    refetch();
    if (isError && errorRef.current === true) {
      handleError(error);
      errorRef.current = false;
    }
  }, [isError, error, refetch]);

  // Returns the data to be sent to the backend
  const getRequired = (formData) => {
    return {
      countryName: formData.country_name,
      countryCode: formData.country_code,
      countryCurrency: formData.currency,
      countryISO: formData.country_iso,
      countryFlag: formData.flag,
    };
  };

  // This adds a new country
  const handleCountryAdd = async (formData) => {
    let requiredData = getRequired(formData);
    let response = await addCountry(requiredData);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Country added successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

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
            data?.map((country, index) => {
              const iso2 = lookup.byIso(country.countryISO.split("-")[0])?.iso2 || "";
              return (
                <CountryCard
                  key={index}
                  image={flags[country.countryCode]}
                  name={country.countryName}
                  countryCode={country.countryISO}
                  countryNumber={country.countryCode}
                  countryCurrency={country.countryCurrency}
                  action={() => {
                    navigate(`/staff-dashboard/businesses/countries/${country.countryISO}/detail`);
                  }}
                />
              );
            })
          )}
          <StaffCountryModal
            open={open}
            setOpen={setOpen}
            cardAction={cardAction}
            submitAction={handleCountryAdd}
            loading={addState.isLoading}
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

const Loader = styled.div`
  grid-column: 1/4;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100px;
`;
