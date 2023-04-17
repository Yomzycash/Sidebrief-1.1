import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Body, Container } from "./styles";
import ServiceDetailHeader from "containers/ServiceDetailHeader";
import { format, parseJSON } from "date-fns";
import { useGetSingleServiceQuery } from "services/staffService";
import { useViewComplyQuery } from "services/complyService";
import { checkStaffEmail } from "utils/globalFunctions";
import CommonButton from "components/button/commonButton";
import { useEffect } from "react";
import lookup from "country-code-lookup";

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
    navigate(`/services/${serviceCategory}`);
  };

  useEffect(() => {
    viewComply.refetch();
  }, []);

  return (
    <Container>
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
      <Body>
        <Outlet context={viewComply} />
      </Body>
      {!isStaffEnd && status?.toLowerCase() !== "submitted" && (
        <CommonButton text="Continue application" action={handleContinue} />
      )}
    </Container>
  );
};

export default ServicesDetailLayout;
