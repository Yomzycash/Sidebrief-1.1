import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";

export const useActions = ({
  addService,
  updateService,
  clickedService,
  refetch,
  setOpen,
  setValue,
  dialogRef,
  parentRef,
}) => {
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

  // This is attached to category dropdown onChange
  const handleCategoryChange = (value) => {
    var string = Object.values(value)[0];
    setValue("category", string, { shouldValidate: true });
  };

  // This is attached to country dropdown onChange
  const handleCountryChange = (value) => {
    let selectedCountry = Object.values(value)[0];
    setValue("country", selectedCountry, { shouldValidate: true });
  };

  // This is attached to currency dropdown onChange
  const handleCurrencyChange = (value) => {
    var string = Object.values(value)[0];
    setValue("currency", string, { shouldValidate: true });
  };

  const scrollToNext = () => {
    dialogRef.current.scrollLeft += dialogRef.current.offsetWidth;
    parentRef.current.scrollTo({
      top: 0,
      behaviour: "smooth",
    });
  };

  return {
    handleServiceAdd,
    handleServiceUpdate,
    handleCategoryChange,
    handleCountryChange,
    handleCurrencyChange,
    scrollToNext,
  };
};
