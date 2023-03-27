import { Outlet, useSearchParams } from "react-router-dom";
import { Body, Container } from "./styles";
import { useEffect, useState } from "react";
import ServiceDetailHeader from "containers/ServiceDetailHeader";
import { useCallback } from "react";
import { format, parseJSON } from "date-fns";
import { useGetSingleServiceQuery } from "services/staffService";
import { useLazyViewComplyQuery } from "services/complyService";

const ServicesDetailLayout = () => {
  const [viewComply, viewComplyState] = useLazyViewComplyQuery();
  const [complyResponse, setComplyResponse] = useState([]);

  let complyCode = "302033545077050509";

  const handleViewResponse = async () => {
    const requiredData = {
      complyCode: complyCode,
    };
    const response = await viewComply(requiredData);
    if (response) setComplyResponse(response);
  };

  let serviceId = complyResponse?.data?.serviceId;

  const serviceData = useGetSingleServiceQuery(serviceId, { refetchOnMountOrArgChange: true });

  console.log(serviceId);

  useEffect(() => {
    handleViewResponse();
  }, []);

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

  return (
    <Container>
      <ServiceDetailHeader
        status={getStatus(complyResponse?.data?.status)}
        serviceName={serviceData?.data?.serviceName}
        code={serviceId}
        date={
          viewComplyState?.isLoading
            ? `--`
            : format(parseJSON("2023-03-13T10:52:36.152Z"), "dd MMMM yyyy")
        }
      />
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
};

export default ServicesDetailLayout;
