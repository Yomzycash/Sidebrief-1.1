import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";

export const useActions = (addService, updateService, clickedService, refetch, setOpen) => {
  // Add service
  const handleServiceAdd = async (formData) => {
    let requiredService = getRequired(formData);
    let response = await addService(requiredService);
    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Service added successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
    console.log("formdata", formData);
  };

  // Update service
  const handleServiceUpdate = async (formData) => {
    let requiredService = getRequired(formData);
    let response = await updateService({ ...requiredService, serviceId: clickedService.serviceId });
    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Service updated successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
    console.log(response);
  };

  return {
    handleServiceAdd,
    handleServiceUpdate,
  };
};

const getRequired = (formData) => {
  return {
    serviceName: formData.name,
    serviceDescription: formData.description,
    serviceCategory: formData.category,
    serviceCountry: formData.country,
    servicePrice: formData.price,
    serviceTimeline: formData.timeline,
    serviceCurrency: formData.currency,
  };
};
