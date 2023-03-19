import React from "react";
import { buttonContainerStyles, buttonStyles, SectionContainer } from "./styled";
import AddDocument from "containers/AddDocument";
import AddTemplate from "containers/AddTemplate";
import SimpleTabNavBar from "components/TabNavBar/SimpleTabNavBar";
import { CheckoutController } from "containers";
import { useViewServiceQuery } from "services/complyService";
import { useActions } from "./actions";
import ServiceDocument from "components/input/ServiceDocuments";
import { useDeleteServiceRequiredDocMutation } from "services/staffService";

const DocsSection = ({ setOpen, service, refetchServices, serviceId, mode }) => {
  const { data, refetch } = useViewServiceQuery(serviceId);
  const [deleteDocument, deleteState] = useDeleteServiceRequiredDocMutation();

  const { scrollTo, handleServiceDocumentAdd, handleServiceDocumentDelete } = useActions({
    service,
    refetchServices,
    refetchService: refetch,
  });

  const tabs = [
    { label: "Required Documents", content: <AddDocument /> },
    { label: "Template Information", content: <AddTemplate /> },
  ];

  const handleDocumentSubmit = async (formData) => {
    return await handleServiceDocumentAdd(formData);
  };

  const handleDeleteDocument = async (info) => {
    return await handleServiceDocumentDelete(info);
  };

  const handleUpdateDocument = (formData) => {
    console.log("Document Updated", formData);
  };

  const handlePrev = () => {
    let infoRef = document.getElementById("staff-service-form");
    scrollTo(infoRef);
    setOpen(mode, serviceId, 100);
  };

  const handleNext = () => {
    let docsRef = document.getElementById("staff-service-docs");
    scrollTo(docsRef);
  };

  return (
    <SectionContainer id="staff-service-docs">
      <SimpleTabNavBar
        tabsInfo={[
          {
            label: "Required Documents",
            content: (
              <>
                {data?.serviceRequirements?.map((el, index) => (
                  <ServiceDocument
                    key={index}
                    index={index}
                    info={el}
                    review={true}
                    handleDocumentSubmit={handleDocumentSubmit}
                    handleDeleteDocument={handleDeleteDocument}
                    handleUpdateDocument={handleUpdateDocument}
                    deleteState={deleteState}
                  />
                ))}

                <ServiceDocument
                  handleDocumentSubmit={handleDocumentSubmit}
                  handleUpdateDocument={handleUpdateDocument}
                  review={false}
                  lastDocument={data?.serviceRequirements?.length + 1}
                />
              </>
            ),
          },
          {
            label: "Template Document",
            content: <></>,
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
        forwardText="Next"
        // forwardDisable={disable}
        $modal
      />
    </SectionContainer>
  );
};

export default DocsSection;
