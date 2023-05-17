import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container, ContinueButton, LastWrapper } from "./styles";
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
import { useMediaQuery } from "@mui/material";
import MobileBusiness from "layout/MobileBusiness";
import { format, parseJSON } from "date-fns";

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
  console.log(data);
  const [viewPayLaunch, viewPayState] = useViewPayLaunchMutation();

  useEffect(() => {
    localStorage.setItem("launchInfo", JSON.stringify(launchResponse));
    localStorage.setItem("countryISO", launchResponse.registrationCountry);

    store.dispatch(setLaunchResponse(launchResponse));
  }, []);

  let getCountry = countries.data
    ? countries?.data.find((country) => country.countryISO === launchResponse.registrationCountry)
    : {
        countryName: "--",
      };
  // handling navigation by checking payment status
  const handleContinueNavigation = async () => {
    let paymentInfo = await checkPaymentStatus({
      ...launchResponse,
      viewPayLaunch,
    });
    localStorage.setItem("paymentDetails", JSON.stringify(paymentInfo.data || {}));
    if (paymentInfo.status) {
      navigate("/launch/address");
    } else {
      navigate("/launch");
    }
  };

  const isPending = isLoading ? false : data?.registrationStatus === "pending";
  //javascript mediaquery
  const matches = useMediaQuery("(max-width:700px)");

  let shareholders = data?.businessShareholders;
  let directors = data?.businessDirectors;
  let beneficiaries = data?.businessBeneficialOwners;
  let paymentInfo = data?.businessPayment;

  // options passed
  let options = [
    {
      title: "Business Information",
      totalLength: 0,
    },
    {
      title: paymentInfo?.length > 0 ? "Payment Details" : "",
      totalLength: 0,
    },
    {
      title: shareholders?.length > 0 ? "Shareholders" : "",
      totalLength: shareholders?.length,
    },
    {
      title: directors?.length > 0 ? "Directors" : "",
      totalLength: directors?.length,
    },
    {
      title: beneficiaries?.length > 0 ? "Beneficiaries" : "",
      totalLength: beneficiaries?.length,
    },
  ];
  //removing empty element from the array
  options = options.filter((el) => el?.title !== "");

  //getting the status of the application

  const getStatus = (stat) => {
    switch (stat) {
      case "pending":
        return {
          text: "draft",
          color: "#00A2D4",
        };
      case "submitted":
        return {
          text: "submitted",
          color: "#D400CC",
        };
      default:
        return {
          text: stat,
          color: "black",
        };
    }
  };

  // hashmap to help in  path navigation for selecting value
  let pathNavigation = {
    "Business Information": "detail",
    "Payment Details": "payment",
    Shareholders: "shareholders",
    Directors: "directors",
    Beneficiaries: "beneficiaries",
  };
  // using selected value to navigate to respective pah
  const selectedValue = (option) => {
    navigate(
      `/dashboard/my-products/business/${
        pathNavigation[option?.title]
      }?launchCode=${searchParams.get("launchCode")}&registrationCountry=${searchParams.get(
        "registrationCountry"
      )}&registrationType=${searchParams.get("registrationType")}`
    );
  };
  const backNavigation = "/dashboard/my-products/business/all-businesses";
  const servicesUrl = "/dashboard/my-products/business";

  return (
    <Container>
      {!matches ? (
        <Header code={searchParams.get("launchCode")} />
      ) : (
        <MobileBusiness
          //selectedValue={selectedValue}
          realSelectedValue={selectedValue}
          originalOptions={options}
          initialTitle={"Business Information"}
          initialLength={0}
          title={"Businesses"}
          date={data === undefined ? `--` : format(parseJSON(data?.createdAt), "do MMMM yyyy")}
          serviceName={data?.businessNames?.businessName1}
          details
          business
          mobile
          backLink={backNavigation}
          servicesUrl={servicesUrl}
          launchResponse={launchResponse}
          code={searchParams.get("launchCode")}
          type={searchParams.get("registrationType")}
          status={getStatus(
            data?.isLoading || data === undefined ? `--` : data?.registrationStatus
          )}
        />
      )}
      <Body>
        <Outlet context={{ data, isLoading, isSuccess, refetch, getCountry }} />
      </Body>
      {isPending ? (
        <LastWrapper>
          <CommonButton
            action={handleContinueNavigation}
            text="Continue Application"
            loading={viewPayState.isLoading}
          >
            Continue Application
          </CommonButton>
        </LastWrapper>
      ) : null}
    </Container>
  );
};

export default BusinessDetailLayout;
