import Modal2 from "layout/modal2";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StaffServicesModalProgressBar from "components/Indicators/progressbar/StaffServicesModalPregressBar";
import { ServiceForms } from "./styled";
import InfoSection from "./InfoSection";
import FormSection from "./FormSection";
import DocsSection from "./DocsSection";
import { useGetSingleServiceQuery } from "services/staffService";

const ServicesModal = ({
  disableAll,
  customTitle,
  clickedService,
  handleServiceDelete,
  deleteState,
  refetch,
  setOpen,
}) => {
  const [disable, setDisable] = useState(disableAll);
  const [searchParams] = useSearchParams();

  let progress = searchParams.get("progress");
  let open = searchParams.get("mode") ? true : false;
  let mode = searchParams.get("mode");
  let serviceId = searchParams.get("serviceId");

  const service = useGetSingleServiceQuery(serviceId);

  let title = mode === "edit" ? "Update Service" : "Add New Service";

  return (
    <Modal2
      title={customTitle || title}
      open={open}
      mode={mode}
      setOpen={setOpen}
      setDisable={setDisable}
      handleDelete={() => handleServiceDelete(clickedService)}
      deleteState={deleteState}
      ProgressBarComponent={<StaffServicesModalProgressBar progress={parseInt(progress) + 0.1} />}
    >
      <ServiceForms progress={progress}>
        <InfoSection
          clickedService={clickedService}
          refetch={refetch}
          disable={disable}
          setOpen={setOpen}
          mode={mode}
          serviceId={serviceId}
          service={service}
        />
        <FormSection setOpen={setOpen} service={service} />
        <DocsSection />
      </ServiceForms>
    </Modal2>
  );
};

export default ServicesModal;
