import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
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
  const { option } = useParams();

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
        navigate(`/services/${option}/payment`);
      }
    } else handleError(error);
  };

  const getLink = () => {
    let service = services.data?.find((el) => el?.serviceId === complyInfo?.serviceId);
    let link = `/services/${option}/form`;
    link = service?.serviceForm?.length < 1 ? `/services/${option}/documents` : link;
    link = service?.serviceRequirements?.length < 1 ? `/services/${option}/review/info` : link;
    return link;
  };

  const getHeaderText = (category) => {
    if (!category)
      return {
        title: "",
        titleSubText: "",
      };

    // console.log(normalize(category));
    if (normalize(category) === "manage")
      return {
        title: "Manage Your Business",
        titleSubText: "Make changes to already registered companies",
      };
    else if (normalize(category) === "onboard")
      return { title: "Onboard Your Business", titleSubText: "Automate your business compliance" };
    else if (normalize(category) === "tax")
      return { title: "Tax", titleSubText: "5mins completion time" };
    else if (normalize(category) === "intellectual-property")
      return {
        title: "Intellectual Property",
        titleSubText: "5mins completion time",
      };
  };

  const normalize = (text) => text?.toLowerCase()?.split(" ")?.join("-");

  return {
    handleSubmit,
    normalize,
    getHeaderText,
  };
};
