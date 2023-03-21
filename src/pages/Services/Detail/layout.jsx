import { Outlet, useSearchParams } from "react-router-dom";
import { Body, Container } from "./styles";
import { useEffect, useState } from "react";
import ServiceDetailHeader from "containers/ServiceDetailHeader";
import { useViewComplyMutation, useViewServiceQuery } from "services/complyService";
import { useCallback } from "react";
import { format } from "date-fns";

const ServicesDetailLayout = () => {
  const [viewComply, viewComplyState] = useViewComplyMutation();
  const [complyResponse, setComplyResponse] = useState([]);

  let complyCode = "302033545077050509";

  const handleViewResponse = async () => {
    const requiredData = {
      complyCode: complyCode,
    };
    const response = await viewComply(requiredData);
    console.log(response);
    setComplyResponse(response);
  };

  let serviceId = complyResponse?.data?.serviceId;

  const serviceData = useViewServiceQuery(serviceId, { refetchOnMountOrArgChange: true });

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

  useEffect(() => {}, []);

  return (
    <Container>
      <ServiceDetailHeader
        status={getStatus(complyResponse?.data?.status)}
        serviceName={serviceData?.data?.serviceName}
        code={serviceId}
        //  date={format(new Date(complyResponse?.data?.createdAt), "do MMMM yyyy")}
      />
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
};

export default ServicesDetailLayout;
