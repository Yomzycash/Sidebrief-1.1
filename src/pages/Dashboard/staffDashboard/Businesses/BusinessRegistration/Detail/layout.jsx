import { Outlet, useSearchParams } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container } from "./styled";
import { useGetAllCountriesQuery, useViewLaunchRequestQuery } from "services/launchService";
import { useGetUserByIdQuery } from "services/staffService";

const StaffBusinessDetailLayout = () => {
  const [searchParams] = useSearchParams();

  const launchResponse = {
    launchCode: searchParams.get("launchCode"),
    registrationCountry: searchParams.get("registrationCountry"),
    registrationType: searchParams.get("registrationType"),
  };

  const countries = useGetAllCountriesQuery();
  const { data, isLoading, isSuccess, refetch } = useViewLaunchRequestQuery(launchResponse);
  const userInfo = useGetUserByIdQuery(data?.meta);

  let getCountry = countries.data
    ? countries?.data.find((country) => country.countryISO === launchResponse.registrationCountry)
    : {
        countryName: "--",
      };

  return (
    <Container>
      <Header isStaff code={searchParams.get("launchCode")} />
      <Body>
        <Outlet context={{ data, isLoading, isSuccess, refetch, getCountry, userInfo }} />
      </Body>
    </Container>
  );
};

export default StaffBusinessDetailLayout;
