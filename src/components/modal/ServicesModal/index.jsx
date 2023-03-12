import Modal2 from "layout/modal2";
import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import StaffServicesModalProgressBar from "components/Indicators/progressbar/StaffServicesModalPregressBar";
import { ServiceForms } from "./styled";
import InfoSection from "./InfoSection";
import FormSection from "./FormSection";
import DocsSection from "./DocsSection";

const ServicesModal = ({
  cardAction,
  setCardAction,
  open,
  setOpen,
  disableAll,
  title,
  serviceInfo,
  countryInfo,
  submitAction,
  loading,
  handleServiceDelete,
  deleteState,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let progress = searchParams.get("progress");

  const dialogRef = useRef();

  return (
    <Modal2
      // handleSubmit={handleSubmit}
      // submitAction={submitAction}
      cardAction={cardAction}
      setCardAction={setCardAction}
      title={title || "Add New Service"}
      open={open}
      setOpen={setOpen}
      loading={loading}
      handleDelete={() => handleServiceDelete(serviceInfo)}
      deleteState={deleteState}
      ProgressBarComponent={<StaffServicesModalProgressBar progress={0.1} />}
    >
      <ServiceForms progress={progress} ref={dialogRef}>
        <InfoSection serviceInfo={serviceInfo} dialogRef={dialogRef} />
        <FormSection dialogRef={dialogRef} />
        <DocsSection dialogRef={dialogRef} />
      </ServiceForms>
    </Modal2>
  );
};

export default ServicesModal;
