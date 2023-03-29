import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Body, Container } from "./styles";
import ServiceDetailHeader from "containers/ServiceDetailHeader";
import { format, parseJSON } from "date-fns";
import { useGetSingleServiceQuery } from "services/staffService";
import { useViewComplyQuery } from "services/complyService";
import { checkStaffEmail } from "utils/globalFunctions";
import { countriesInfo } from "utils/allCountries";
import CommonButton from "components/button/commonButton";

const ServicesDetailLayout = () => {
  const { complycode } = useParams();
  const viewComply = useViewComplyQuery({
    complyCode: complycode,
  });

  const comply = viewComply?.data;
  const serviceId = comply?.serviceId;
  const complyCode = comply?.complyCode;
  const status = comply?.status?.toLowerCase();

  const serviceData = useGetSingleServiceQuery(serviceId, { refetchOnMountOrArgChange: true });
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

  const handleContinue = () => {
    let currency = serviceData.data?.serviceCurrency;

    let complyInfo = {
      ...comply,
      serviceCountry: getCountry(currency),
      serviceName: serviceData.data?.serviceName,
    };

    let paymentInfo = comply?.complyPayment[0];

    console.log(paymentInfo);
    localStorage.setItem("complyInfo", JSON.stringify(complyInfo));
    localStorage.setItem("paymentDetails", JSON.stringify(paymentInfo));
    navigate("/services");
  };

  const getCountry = (currency) => {
    return countriesInfo.filter((el) => el.currency.toLowerCase() === currency?.toLowerCase())[0]
      ?.name;
  };

  return (
    <Container>
      <ServiceDetailHeader
        status={getStatus(viewComply?.data?.status)}
        serviceName={serviceData?.data?.serviceName}
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
      {!isStaffEnd && status && (
        <CommonButton text="Continue application" action={handleContinue} />
      )}
    </Container>
  );
};

export default ServicesDetailLayout;
