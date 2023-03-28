import { Outlet, useParams } from "react-router-dom";
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
  console.log(viewComply)
  
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

  console.log(viewComply.data);

  return (
    <Container>
      <ServiceDetailHeader
        status={getStatus(viewComply?.data?.status)}
        serviceName={serviceData?.data?.serviceName}
        code={serviceId}
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
        <Outlet />
      </Body>
    </Container>
  );
};

export default ServicesDetailLayout;
