import { Outlet, useSearchParams } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container } from "./styles";
import { store } from "redux/Store";
import { setLaunchResponse } from "redux/Slices";
import { useEffect } from "react";

const BusinessDetailLayout = () => {
  const [searchParams] = useSearchParams();

  const launchResponse = {
    launchCode: searchParams.get("launchCode"),
    registrationCountry: searchParams.get("registrationCountry"),
    registrationType: searchParams.get("registrationType"),
  };

  localStorage.setItem("launchInfo", JSON.stringify(launchResponse));
  localStorage.setItem("countryISO", launchResponse.registrationCountry);

  useEffect(() => {
    store.dispatch(setLaunchResponse(launchResponse));
  }, []);

  return (
    <Container>
      <Header />
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
};

export default BusinessDetailLayout;
