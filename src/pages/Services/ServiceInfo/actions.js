import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";

export const useActions = ({
  selectedCountry,
  selectedService,
  complyInfo,
  services,
  createComply,
  updateComply,
  navigate,
}) => {
  // Submits form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      toast.error("Select service country");
      return;
    } else if (!selectedService?.serviceId) {
      toast.error("Select service");
      return;
    }

    let payload = {
      serviceId: selectedService?.serviceId,
      complyCode: complyInfo?.complyCode,
      status: complyInfo?.status,
      paid: complyInfo?.paid,
    };

    let response = complyInfo?.complyCode
      ? await updateComply(payload)
      : await createComply({ serviceId: selectedService.serviceId });
    let data = response?.data;
    let error = response?.error;

    if (data) {
      let info = {
        ...data,
        serviceCountry: selectedCountry,
        serviceName: selectedService?.serviceName,
      };
      localStorage.setItem("complyInfo", JSON.stringify(info));
      const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));

      if (paymentDetails?.paymentStatus === "successful") {
        const link = getLink();
        navigate(link);
      } else {
        navigate("/services/payment");
      }
    } else handleError(error);
  };

  const getLink = () => {
    let service = services.data?.find((el) => el?.serviceId === complyInfo?.serviceId);
    let link = "/services/form";
    link = service?.serviceForm?.length < 1 ? "/services/documents" : link;
    link = service?.serviceRequirements?.length < 1 ? "/services/review/info" : link;
    return link;
  };

  return {
    handleSubmit,
  };
};
