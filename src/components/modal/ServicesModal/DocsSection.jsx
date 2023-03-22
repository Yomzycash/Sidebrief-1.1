import React, { useMemo } from "react";
import {
  buttonContainerStyles,
  buttonStyles,
  SectionInfoContainer,
  SectionContainer,
} from "./styled";
import SimpleTabNavBar from "components/TabNavBar/SimpleTabNavBar";
import { CheckoutController } from "containers";
import { useActions } from "./actions";
import {
  useAddServiceRequiredDocMutation,
  useUpdateServiceRequiredDocMutation,
  useDeleteServiceRequiredDocMutation,
  useAddServiceDocTemplateMutation,
  useUpdateServiceDocTemplateMutation,
  useDeleteServiceDocTemplateMutation,
} from "services/staffService";
import ServiceDocumentTemplate from "components/Form/ServiceDocument/Template";
import ServiceDocument from "components/Form/ServiceDocument";
import { useGetSingleServiceQuery } from "services/staffService";
import { toast } from "react-hot-toast";

const DocsSection = ({ setOpen, service, serviceId, refetchServices, mode }) => {
  const { data, refetch } = useGetSingleServiceQuery(serviceId);

  const [addDocument, addDocumentState] = useAddServiceRequiredDocMutation();
  const [updateDocument, updateDocumentState] = useUpdateServiceRequiredDocMutation();
  const [deleteDocument, deleteDocumentState] = useDeleteServiceRequiredDocMutation();

  const [addTemplate, addTemplateState] = useAddServiceDocTemplateMutation();
  const [updateTemplate, updateTemplateState] = useUpdateServiceDocTemplateMutation();
  const [deleteTemplate, deleteTemplateState] = useDeleteServiceDocTemplateMutation();

  const {
    scrollTo,
    handleServiceDocumentAdd,
    handleServiceDocumentUpdate,
    handleServiceDocumentDelete,
    handleServiceTemplateAdd,
    handleServiceTemplateUpdate,
    handleServiceTemplateDelete,
  } = useActions({
    service,
    serviceId,
    addDocument,
    updateDocument,
    deleteDocument,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    refetchServices,
    refetchService: refetch,
  });

  const handleDocumentSubmit = async (formData) => {
    return await handleServiceDocumentAdd(formData);
  };

  const handleUpdateDocument = async (formData) => {
    return await handleServiceDocumentUpdate(formData);
  };

  const handleDeleteDocument = async (info) => {
    return await handleServiceDocumentDelete(info);
  };

  const handleTemplateSubmit = async (formData) => {
    return await handleServiceTemplateAdd(formData);
  };

  const handleDeleteTemplate = async (info) => {
    return await handleServiceTemplateDelete(info);
  };

  const handleUpdateTemplate = async (formData) => {
    return await handleServiceTemplateUpdate(formData);
  };

  const handlePrev = () => {
    let infoRef = document.getElementById("staff-service-form");
    scrollTo(infoRef);
    setOpen(mode, serviceId, 100);
  };

  const handleNext = () => {
    setOpen(false);
    toast.success("Successfully created service");
  };

  let serviceDocInfo = useMemo(
    () =>
      data?.serviceRequirements?.map((el) => {
        let templateInfo = data?.serviceTemplates?.find(
          (each) => each?.templateName === el?.requirementName
        );

        return {
          templateCode: templateInfo?.templateCode || "",
          templateName: el?.requirementName,
          templateLink: templateInfo?.templateLink || "",
        };
      }),
    [data?.serviceRequirements, data?.serviceTemplates]
  );

  return (
    <SectionContainer id="staff-service-docs">
      <SimpleTabNavBar
        tabsInfo={[
          {
            label: "Required Documents",
            content: (
              <SectionInfoContainer>
                {data?.serviceRequirements?.map((el, index) => (
                  <ServiceDocument
                    key={index}
                    index={index}
                    info={el}
                    review={true}
                    handleDocumentSubmit={handleDocumentSubmit}
                    handleDeleteDocument={handleDeleteDocument}
                    handleUpdateDocument={handleUpdateDocument}
                    deleteState={deleteDocumentState}
                    updateState={updateDocumentState}
                  />
                ))}

                <ServiceDocument
                  handleDocumentSubmit={handleDocumentSubmit}
                  handleUpdateDocument={handleUpdateDocument}
                  review={false}
                  lastDocument={data?.serviceRequirements?.length + 1}
                  addState={addDocumentState}
                />
              </SectionInfoContainer>
            ),
          },
          {
            label: "Template Document",
            content: (
              <SectionInfoContainer>
                {serviceDocInfo?.map((el, index) => (
                  <ServiceDocumentTemplate
                    key={index}
                    index={index}
                    info={el}
                    review={false}
                    handleTemplateSubmit={handleTemplateSubmit}
                    handleDeleteTemplate={handleDeleteTemplate}
                    handleUpdateTemplate={handleUpdateTemplate}
                    addState={addTemplateState}
                    updateState={updateTemplateState}
                    deleteState={deleteTemplateState}
                  />
                ))}
              </SectionInfoContainer>
            ),
          },
        ]}
      />

      <CheckoutController
        backAction={handlePrev}
        forwardAction={handleNext}
        backText="Previous"
        containerStyle={buttonContainerStyles}
        backBottonStyle={buttonStyles}
        forwardButtonStyle={buttonStyles}
        forwardText="Done"
        // forwardDisable={disable}
        $modal
      />
    </SectionContainer>
  );
};

export default DocsSection;
