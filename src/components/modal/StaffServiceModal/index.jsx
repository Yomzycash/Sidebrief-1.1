import { yupResolver } from "@hookform/resolvers/yup";
import { DropDown, InputWithLabel } from "components/input";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import Modal1 from "layout/modal1";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllCountriesQuery, useGetAllServicesQuery } from "services/staffService";
import { ServicesSchema } from "utils/config";
import { Switch } from "components/switch";
import styled from "styled-components";
import QuestionnaireInput from "components/input/QuestionnaireInput";
import ServiceTabbedNavigation from "components/tabbedDocument";
import AddDocument from "containers/AddDocument";
import AddTemplate from "containers/AddTemplate";
import { Download, Upload } from "components/File";
import { DocumentSection, Document } from "./styles";
import { DocContentDownload, DocContentUpload } from "./constants";

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
  const [disable, setDisable] = useState(disableAll);
  const [servicesCountries, setServicesCountries] = useState([{ value: "", label: "" }]);

  const [servicesCategories, setServicesCategories] = useState([{ value: "", label: "" }]);
  const [serviceCurrencies, setServiceCurrencies] = useState([{ value: "", label: "" }]);

  const countries = useGetAllCountriesQuery();
  const { data } = useGetAllServicesQuery();
  const categories = useGetAllServicesQuery();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ServicesSchema),
  });

  // Update entity countries
  useEffect(() => {
    let allCountries = countries.data;

    setServicesCountries(
      allCountries &&
        allCountries.map((country) => ({
          value: country.countryISO,
          label: country.countryISO,
        }))
    );
    setServiceCurrencies(
      allCountries &&
        allCountries.map((currency) => ({
          value: currency.countryCurrency,
          label: currency.countryCurrency,
        }))
    );
  }, [countries.data]);

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

  useEffect(() => {
    const categoryResponse = data?.map((serviceCats) => serviceCats.serviceCategory);
    // Filter out duplicate entries
    const eachResponse = categoryResponse?.filter((option, index, self) => {
      return index === self.indexOf(option);
    });
    let newCategory = eachResponse?.map((servicesCategory) => ({
      value: servicesCategory,
      label: servicesCategory,
    }));
    setServicesCategories(newCategory);
  }, [data]);

  //
  useEffect(() => {
    if (serviceInfo && cardAction === "edit") {
      setValue("name", serviceInfo.serviceName, { shouldValidate: true });
      setValue("description", serviceInfo.serviceDescription, { shouldValidate: true });
      setValue("category", serviceInfo.serviceCategory, { shouldValidate: true });
      setValue("country", serviceInfo.serviceCountry, { shouldValidate: true });
      setValue("currency", serviceInfo.serviceCurrency, { shouldValidate: true });
      setValue("price", serviceInfo.servicePrice, { shouldValidate: true });
      setValue("timeline", serviceInfo.serviceTimeline, { shouldValidate: true });
    } else {
      setValue("name", "");
      setValue("description", "");
      setValue("category", "");
      setValue("country", "");
      setValue("currency", "");
      setValue("price", "");
      setValue("timeline", "");
    }
    setDisable(disableAll);
  }, [serviceInfo, cardAction]);

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={submitAction}
      cardAction={cardAction}
      setCardAction={setCardAction}
      title={title || "Add New Service"}
      open={open}
      setOpen={setOpen}
      disable={disable}
      setDisable={setDisable}
      loading={loading}
      handleDelete={() => handleServiceDelete(serviceInfo)}
      deleteState={deleteState}
    >
      {/* <ServiceTabbedNavigation /> */}
      <DocumentSection>
        <Document>
          {DocContentDownload.map((doc) => (
            <Download key={doc.id} docType={doc.doctype} fileUrl={doc.fileUrl} />
          ))}
        </Document>
      </DocumentSection>
      <DocumentSection>
        <Document>
          {DocContentUpload.map((doc) => (
            <Upload key={doc.id} docType={doc.doctype} />
          ))}
        </Document>
      </DocumentSection>
    </Modal1>
  );
};

export default ServicesModal;
