import Modal2 from "layout/modal2";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StaffServicesModalProgressBar from "components/Indicators/progressbar/StaffServicesModalPregressBar";
import { ServiceForms } from "./styled";
import InfoSection from "./InfoSection";
import FormSection from "./FormSection";
import DocsSection from "./DocsSection";
import { useGetSingleServiceQuery } from "services/staffService";

const StaffServicesModal = ({
  disableAll,
  customTitle,
  clickedService,
  handleServiceDelete,
  deleteState,
  refetch,
  setOpen,
  dialog,
}) => {
  const [disable, setDisable] = useState(disableAll);

  let progress = dialog.progress;
  let open = dialog.mode ? true : false;
  let mode = dialog.mode;
  let serviceId = dialog.serviceId;

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
          refetchServices={refetch}
          disable={disable}
          setOpen={setOpen}
          mode={mode}
          serviceId={serviceId}
          service={clickedService}
        />
        <FormSection
          setOpen={setOpen}
          service={clickedService}
          refetchServices={refetch}
          serviceId={serviceId}
          mode={mode}
        />
        <DocsSection
          setOpen={setOpen}
          service={clickedService}
          refetchServices={refetch}
          serviceId={serviceId}
          mode={mode}
        />
      </ServiceForms>
    </Modal2>
  );
};

export default StaffServicesModal;
