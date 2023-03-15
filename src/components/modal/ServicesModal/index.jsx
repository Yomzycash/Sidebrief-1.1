import Modal2 from "layout/modal2";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StaffServicesModalProgressBar from "components/Indicators/progressbar/StaffServicesModalPregressBar";
import { ServiceForms } from "./styled";
import InfoSection from "./InfoSection";
import FormSection from "./FormSection";
import DocsSection from "./DocsSection";

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

  let title = mode === "edit" ? "Update Service" : "Add New Service";

  const parentRef = useRef();
  const dialogRef = useRef();

  return (
    <Modal2
      title={customTitle || title}
      open={open}
      mode={mode}
      setOpen={setOpen}
      setDisable={setDisable}
      handleDelete={() => handleServiceDelete(clickedService)}
      deleteState={deleteState}
      ProgressBarComponent={<StaffServicesModalProgressBar progress={0.1} />}
      parentRef={parentRef}
    >
      <ServiceForms progress={progress} ref={dialogRef}>
        <InfoSection
          clickedService={clickedService}
          dialogRef={dialogRef}
          parentRef={parentRef}
          refetch={refetch}
          disable={disable}
          setOpen={setOpen}
          mode={mode}
        />
        <FormSection dialogRef={dialogRef} />
        <DocsSection dialogRef={dialogRef} />
      </ServiceForms>
    </Modal2>
  );
};

export default ServicesModal;
