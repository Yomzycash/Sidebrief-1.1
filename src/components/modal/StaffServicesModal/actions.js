import { toast } from "react-hot-toast";
import { useGetAllServicesQuery } from "services/staffService";
import { handleError, handleResponse } from "utils/globalFunctions";

export const useActions = ({
  addService,
  updateService,
  addFormField,
  updateFormField,
  deleteFormField,
  addDocument,
  updateDocument,
  deleteDocument,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  service,
  serviceId,
  refetchServices,
  refetchService,
  setOpen,
  setValue,
  mode,
}) => {
  const getServicePayload = (formData) => {
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

  // const services = useGetAllServicesQuery();

  // const handleServiceUpdate = async () => {
  //   let all = services.data;
  //   let manage = all?.filter((el) => el?.serviceCategory === "MANAGE");
  //   console.log(manage);
  //   let promiseRes = manage
  //     ?.slice(0, 1)
  //     ?.map((el) => updateService({ ...el, serviceCategory: "Manage" }));
  //   let response = await Promise.all(promiseRes);
  //   console.log(response);
  // };

  //
  const getFormPayload = (formData) => {
    let hasOptions = formData.selectedType === "checkbox" || formData.selectedType === "radio";
    if (hasOptions) {
      return {
        serviceId: mode === "edit" ? service?.serviceId : serviceId,
        serviceFormField: {
          fieldQuestion: formData.question,
          fieldType: formData.selectedType,
          fieldRequired: formData.required.toString(),
          fieldOptions: formData.optionsArray,
        },
      };
    } else {
      return {
        serviceId: mode === "edit" ? service?.serviceId : serviceId,
        serviceFormField: {
          fieldQuestion: formData.question,
          fieldType: formData.selectedType,
          fieldRequired: formData.required.toString(),
        },
      };
    }
  };

  //
  const getDocumentPayload = (formData) => {
    return {
      serviceId: mode === "edit" ? service?.serviceId : serviceId,
      serviceRequirement: {
        requirementName: formData.documentName,
        requirementDescription: formData.documentDescription,
      },
    };
  };

  //
  const getTemplatePayload = (formData) => {
    return {
      serviceId: mode === "edit" ? service?.serviceId : serviceId,
      serviceTemplate: {
        templateName: formData?.templateName,
        templateType: formData?.templateLink?.split(".")?.pop(),
        templateLink: formData?.templateLink,
        fileName: formData?.templateLink?.split("/")?.pop(),
        fileType: formData?.templateLink?.split(".")?.pop(),
      },
    };
  };

  let formRef = document.getElementById("staff-service-form");

  //

  // Adds service
  const handleServiceAdd = async (formData) => {
    let payload = getServicePayload(formData);
    let response = await addService(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      setOpen("add", response.data?.serviceId, 50);
      scrollTo(formRef);
      refetchServices();
    } else {
      handleError(error);
      // console.log(error);
      // handleError(error);
    }
  };

  //

  // Updates service
  const handleServiceUpdate = async (formData) => {
    let payload = service?.productId
      ? {
          ...getServicePayload(formData),
          serviceId: service?.serviceId,
          productID: service?.productId || "",
        }
      : {
          ...getServicePayload(formData),
          serviceId: service?.serviceId,
        };
    let response = await updateService(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      setOpen(mode, response.data?.serviceId, 50);
      scrollTo(formRef);
      refetchServices();
    } else {
      handleError(error);
      // console.log(error);
      // handleError(error);
    }
  };

  // Adds form question
  const handleServiceFormFieldAdd = async (formData) => {
    let payload = getFormPayload(formData);
    let response = await addFormField(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      refetchService();
      return response;
    } else handleError(error);
  };

  //

  // Updates form question
  const handleServiceFormFieldUpdate = async (formInfo) => {
    let payload = { ...getFormPayload(formInfo), fieldCode: formInfo?.fieldCode };
    let response = await updateFormField(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      refetchService();
      return response;
    } else {
      handleError(error);
    }
  };

  //

  // Deletes form question
  const handleServiceFormFieldDelete = async (info) => {
    let payload = {
      serviceId: mode === "edit" ? service?.serviceId : serviceId,
      fieldCode: info.fieldCode,
    };
    let response = await deleteFormField(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      refetchService();
    } else {
      handleError(error);
    }
  };

  //

  // Adds serevice required document
  const handleServiceDocumentAdd = async (formData) => {
    let payload = getDocumentPayload(formData);
    let response = await addDocument(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      refetchService();
      return response;
    } else handleError(error);
  };

  //

  // Updates service required document
  const handleServiceDocumentUpdate = async (formInfo) => {
    let payload = { ...getDocumentPayload(formInfo), requirementCode: formInfo?.requirementCode };
    let response = await updateDocument(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      refetchService();
      return response;
    } else handleError(error);
  };

  //

  // Deletes service required document
  const handleServiceDocumentDelete = async (info) => {
    let payload = {
      serviceId: mode === "edit" ? service?.serviceId : serviceId,
      requirementCode: info?.requirementCode,
    };
    let response = await deleteDocument(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      refetchService();
      return response;
    } else handleError(error);
  };

  const handleServiceTemplateAdd = async (formData) => {
    let payload = getTemplatePayload(formData);
    let response = await addTemplate(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      refetchService();
      return response;
    } else handleError(error);
  };

  const handleServiceTemplateUpdate = async (formInfo) => {
    let payload = { ...getTemplatePayload(formInfo), templateCode: formInfo?.templateCode };
    let response = await updateTemplate(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      refetchService();
      return response;
    } else handleError(error);
  };

  const handleServiceTemplateDelete = async (info) => {
    let payload = {
      serviceId: mode === "edit" ? service?.serviceId : serviceId,
      templateCode: info?.templateCode,
    };
    let response = await deleteTemplate(payload);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      refetchService();
      return response;
    } else handleError(error);
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
    handleServiceFormFieldUpdate,
    handleServiceFormFieldDelete,
    handleServiceDocumentAdd,
    handleServiceDocumentUpdate,
    handleServiceDocumentDelete,
    handleServiceTemplateAdd,
    handleServiceTemplateUpdate,
    handleServiceTemplateDelete,
    handleCategoryChange,
    handleCountryChange,
    handleCurrencyChange,
    scrollTo,
  };
};
