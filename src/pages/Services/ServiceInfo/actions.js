import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";

export const useActions = ({
  selectedCountry,
  selectedService,
  complyInfo,
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
        navigate("/services/form");
      } else {
        navigate("/services/payment");
      }
    } else handleError(error);
  };

  return {
    handleSubmit,
  };
};
