import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container, ContinueButton } from "./styles";
import { store } from "redux/Store";
import { setLaunchResponse } from "redux/Slices";
import { useEffect } from "react";
import {
  useGetAllCountriesQuery,
  useViewLaunchRequestQuery,
  useViewPayLaunchMutation,
} from "services/launchService";
import { checkPaymentStatus } from "pages/Launch/actions";
import { Puff } from "react-loading-icons";
import { CommonButton } from "components/button";

const BusinessDetailLayout = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const launchResponse = {
    launchCode: searchParams.get("launchCode"),
    registrationCountry: searchParams.get("registrationCountry"),
    registrationType: searchParams.get("registrationType"),
  };

  const countries = useGetAllCountriesQuery();
  const { data, isLoading, isSuccess, refetch } = useViewLaunchRequestQuery(launchResponse);
  const [viewPayLaunch, viewPayState] = useViewPayLaunchMutation();

  useEffect(() => {
    localStorage.setItem("launchInfo", JSON.stringify(launchResponse));
    localStorage.setItem("countryISO", launchResponse.registrationCountry);

    store.dispatch(setLaunchResponse(launchResponse));
  }, []);

  let getC = countries.data
    ? countries?.data.find((country) => country.countryISO === launchResponse.registrationCountry)
    : {
        countryName: "--",
      };

  const handleContinueNavigation = async () => {
    let paymentInfo = await checkPaymentStatus({
      ...launchResponse,
      viewPayLaunch,
    });
    localStorage.setItem("paymentDetails", JSON.stringify(paymentInfo.data));
    if (paymentInfo.status) {
      navigate("/launch/address");
    } else {
      navigate("/launch");
    }
  };

  const isPending = isLoading ? false : data?.registrationStatus === "pending";

  return (
    <Container>
      <Header code={searchParams.get("launchCode")} />
      <Body>
        <Outlet context={{ data, isLoading, isSuccess, refetch, getC }} />
      </Body>
      {isPending ? (
        <CommonButton
          action={handleContinueNavigation}
          text="Continue Application"
          loading={viewPayState.isLoading}
        >
          Continue Application
        </CommonButton>
      ) : null}
    </Container>
  );
};

export default BusinessDetailLayout;
