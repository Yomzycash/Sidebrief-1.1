import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Body, Container, LastWrapper } from "./styles";
import ServiceDetailHeader from "containers/ServiceDetailHeader";
import { format, parseJSON } from "date-fns";
import { useGetSingleServiceQuery } from "services/staffService";
import { useViewComplyQuery } from "services/complyService";
import { checkStaffEmail } from "utils/globalFunctions";
import CommonButton from "components/button/commonButton";
import { useEffect, useState } from "react";
import lookup from "country-code-lookup";
import MobileBusiness from "layout/MobileBusiness";
import { useMediaQuery } from "@mui/material";

const ServicesDetailLayout = () => {
  const { complycode } = useParams();

  const viewComply = useViewComplyQuery({
    complyCode: complycode,
  });

  const comply = viewComply?.data;
  const serviceId = comply?.serviceId;
  const complyCode = comply?.complyCode;
  const status = comply?.status?.toLowerCase();

  const viewService = useGetSingleServiceQuery(serviceId, { refetchOnMountOrArgChange: true });
  const service = viewService.data;
  const serviceName = service?.serviceName;
  const serviceCategory = service?.serviceCategory?.toLowerCase();
  const serviceCountry = service?.serviceCountry;

  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

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

  const { pathname } = useLocation();
  const mainUrl = pathname.split("/").slice(0, -1).join("/");
  const isStaffEnd = pathname.toLowerCase().includes("staff");

  const navigate = useNavigate();

  //
  const handleContinue = () => {
    const countryISO = serviceCountry;
    let complyInfo = {
      ...comply,
      serviceCountry: lookup.byIso(countryISO)?.country,
      serviceName: serviceName,
    };
    let paymentInfo = comply?.complyPayment[0] || {};

    localStorage.setItem("complyInfo", JSON.stringify(complyInfo));
    localStorage.setItem("paymentDetails", JSON.stringify(paymentInfo));
    navigate(`/services/${serviceCategory?.split(" ")?.join("-")}`);
  };

  useEffect(() => {
    viewComply.refetch();
  }, []);

  let pathNavigation = {
    "Product Information": "info",

    Form: "forminfo",

    Document: "documentinfo",
  };

  const matches = useMediaQuery("(max-width:700px)");
  let options = [
    "Product Information",
    viewComply?.data?.complyData > 0 ? "Form" : "",
    viewComply?.data?.complyDocuments > 0 ? "Document" : "",
  ];
  options = options.filter((el) => el !== "");

  let path = pathname.split("/");
  let pathSelected = "";

  for (let i = 0; i < path.length; i++) {
    if (
      path[i] === "manage" ||
      path[i] === "tax" ||
      path[i] === "onboard" ||
      path[i] === "intellectual-property" ||
      path[i] === "compliance"
    ) {
      pathSelected = path[i];
      break;
    }
  }
  const backNavigation = `/dashboard/my-products/${pathSelected} `;

  const selectedValue = (option) => {
    if (pathSelected === "tax") {
      navigate(
        `/dashboard/my-products/${pathSelected}/all-taxes/${complyCode}/${pathNavigation[option]}`
      );
    } else {
      navigate(
        `/dashboard/my-products/${pathSelected}/all-${pathSelected}/${complyCode}/${pathNavigation[option]}`
      );
    }
  };
  return (
    <Container>
      {!matches ? (
        <ServiceDetailHeader
          status={getStatus(status)}
          serviceName={viewService?.data?.serviceName}
          code={complyCode}
          mainUrl={mainUrl}
          date={
            viewComply?.isLoading
              ? `--`
              : format(parseJSON(viewComply?.data?.createdAt), "do MMMM yyyy")
          }
          complyCode={complycode}
          isStaff={staffEmail}
          document={viewComply?.data?.complyDocuments}
          form={viewComply?.data?.complyData}
        />
      ) : (
        <MobileBusiness
          selectedValue={selectedValue}
          options={options}
          initialValue={"Product Information"}
          title={"Businesses"}
          date={
            viewService?.data === undefined
              ? `--`
              : format(parseJSON(viewService?.data?.createdAt), "do MMMM yyyy")
          }
          serviceName={viewService?.data?.serviceName}
          details
          backLink={backNavigation}
          code={complycode}
          // type={searchParams.get("registrationType")}
          status={getStatus(
            viewService?.data?.isLoading || viewService?.data === undefined ? `--` : status
          )}
        />
      )}
      <Body>
        <Outlet context={viewComply} />
      </Body>
      {!isStaffEnd && status?.toLowerCase() !== "submitted" && (
        <LastWrapper>
          <CommonButton text="Continue application" action={handleContinue} />
        </LastWrapper>
      )}
    </Container>
  );
};

export default ServicesDetailLayout;
