import { toast } from "react-hot-toast";
import { handleError, handleResponse } from "utils/globalFunctions";

export const useActions = ({
  addService,
  updateService,
  addFormField,
  updateFormField,
  service,
  refetch,
  setOpen,
  setValue,
  mode,
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

  const getFormPayload = (formData) => {
    let hasOptions = formData.selectedType === "checkbox" || formData.selectedType === "radio";
    if (hasOptions) {
      return {
        serviceId: service?.serviceId,
        serviceFormField: {
          fieldQuestion: formData.question,
          fieldType: formData.selectedType,
          fieldRequired: formData.required.toString(),
          fieldOptions: formData.optionsArray,
        },
      };
    } else {
      return {
        serviceId: service?.serviceId,
        serviceFormField: {
          fieldQuestion: formData.question,
          fieldType: formData.selectedType,
          fieldRequired: formData.required.toString(),
        },
      };
    }
  };

  let formRef = document.getElementById("staff-service-form");

  // Add service
  const handleServiceAdd = async (formData) => {
    let payload = getRequired(formData);
    let response = await addService(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      setOpen("add", response.data?.serviceId, 50);
      scrollTo(formRef);
      refetch();
    } else {
      handleError(error);
    }
  };

  // Update service
  const handleServiceUpdate = async (formData) => {
    let payload = getRequired(formData);
    let response = await updateService({ ...payload, serviceId: service?.serviceId });
    let data = response?.data;
    let error = response?.error;
    if (data) {
      setOpen(mode, response.data?.serviceId, 50);
      scrollTo(formRef);
      refetch();
    } else {
      handleError(error);
    }
  };

  // Add form question
  const handleServiceFormFieldAdd = async (formData) => {
    let payload = getFormPayload(formData);
    let response = await addFormField({ ...payload });
    let error = response?.error;
    if (error) handleError(error);
  };

  // Update form question
  const handleServiceFormFieldUpdate = async (formData) => {
    let payload = getFormPayload(formData);
    let response = await updateFormField(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      console.log(data);
    } else {
      handleError(error);
    }
  };

  const handleServiceFormFieldDelete = async (formInfo) => {
    console.log(formInfo);
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

  const scrollTo = (element) => {
    element.scrollIntoView({
      behaviour: "smooth",
    });
  };

  return {
    handleServiceAdd,
    handleServiceUpdate,
    handleServiceFormFieldAdd,
    handleServiceFormFieldDelete,
    handleCategoryChange,
    handleCountryChange,
    handleCurrencyChange,
    scrollTo,
  };
};
