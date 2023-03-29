import { Outlet, useLocation, useParams } from "react-router-dom";
import { Body, Container } from "./styles";
import ServiceDetailHeader from "containers/ServiceDetailHeader";
import { format, parseJSON } from "date-fns";
import { useGetSingleServiceQuery } from "services/staffService";
import { useViewComplyQuery } from "services/complyService";
import { checkStaffEmail } from "utils/globalFunctions";

const ServicesDetailLayout = () => {
  const { complycode } = useParams();
  const viewComply = useViewComplyQuery({
    complyCode: complycode,
  });
  const serviceId = viewComply?.data?.serviceId;

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

  return (
    <Container>
      <ServiceDetailHeader
        status={getStatus(viewComply?.data?.status)}
        serviceName={serviceData?.data?.serviceName}
        code={serviceId}
        mainUrl={mainUrl}
        date={
          viewComply?.isLoading
            ? `--`
            : format(parseJSON(viewComply?.data?.createdAt), "do MMMM yyyy")
        }
        complyCode={complycode}
        isStaff={staffEmail}
        document={viewComply?.data?.complyDocuments
        }
        form ={viewComply?.data?.complyData}
      />
      <Body>
        <Outlet context={viewComply} />
      </Body>
    </Container>
  );
};

export default ServicesDetailLayout;
