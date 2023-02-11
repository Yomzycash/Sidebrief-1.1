import { DropDown, InputWithLabel } from "components/input";
import Modal1 from "layout/modal1";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import { useState } from "react";
import { ServicesSchema } from "utils/config";
import { useEffect } from "react";
import { 
    useGetAllServicesQuery,
} from "services/staffService";

const StaffServiceModal = ({
  cardAction,
  open,
  setOpen,
  loading,
  submitAction,
  rewardInfo,
}) => {
  const [categories, setCategories] = useState([{ value: "", label: "" }]);

  const { data, isLoading, isError, isSuccess } = useGetAllServicesQuery();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ServicesSchema),
  });

  useEffect(() => {
    const categories = data
      ? data.map((element) => element.rewardCategory)
      : [];

    setCategories(
      categories
        ? [...new Set(categories)].map((cat) => ({
            value: cat,
            label: cat,
          }))
        : []
    );
  }, [data]);

  const handleCategoryChange = (value) => {
    let category = Object.values(value)[0];
    setValue("category", category, { shouldValidate: true });
  };

  useEffect(() => {
    if (cardAction === "edit" && rewardInfo) {
      setValue("reward_name", rewardInfo.rewardName, {
        shouldValidate: true,
      });
      setValue("partner", rewardInfo.rewardPartner, {
        shouldValidate: true,
      });
      setValue("description", rewardInfo.rewardDescription, {
        shouldValidate: true,
      });
      setValue("category", rewardInfo.rewardCategory, {
        shouldValidate: true,
      });
      setValue("code", rewardInfo.rewardCode, { shouldValidate: true });
      setValue("link", rewardInfo.rewardLink, { shouldValidate: true });
      setValue("image", rewardInfo.rewardImage, { shouldValidate: true });
    }
  }, [rewardInfo]);

  return (
    <Modal1
      handleSubmit={handleSubmit}
      submitAction={submitAction}
      cardAction={cardAction}
      title="Add New Service"
      open={open}
      setOpen={setOpen}
      loading={loading}
      $hideIcons
    >
      <DetailedSection>
        <InputWithLabel
          label="Service Name"
          labelStyle="input-label"
          placeholder="Enter service name"
          type="text"
          name="service_name"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.service_name?.message}
        />
      </DetailedSection>

      <DetailedSection>
        <InputWithLabel
          label="Service Description"
          labelStyle="input-label"
          placeholder="Enter service description"
          type="text"
          name="service_description"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.service_description?.message}
        />
      </DetailedSection>
      

      <DetailedSection>
        <InputWithLabel
            label="Service ID"
            labelStyle="input-label"
            placeholder="Enter service ID"
            type="text"
            name="service_id"
            inputClass="input-class"
            containerStyle="input-container-class"
            register={register}
            errorMessage={errors.service_id?.message}
        />

        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Category"
          name="category"
          labelStyle="input-label"
          placeholder="Select Category"
          options={categories}
          onChange={handleCategoryChange}
          errorMessage={errors.category?.message}
          cardAction={cardAction}
          defaultValue={rewardInfo ? rewardInfo.rewardCategory : ""}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          // disable={disable}
        />
      </DetailedSection>

      <DetailedSection>
        <DropDown
          containerStyle={{ margin: 0, marginBottom: "24px" }}
          label="Operational Country"
          name="country"
          labelStyle="input-label"
          placeholder="Select Category"
          options={categories}
          onChange={handleCategoryChange}
          errorMessage={errors.country?.message}
          cardAction={cardAction}
          defaultValue={rewardInfo ? rewardInfo.rewardCategory : ""}
          fontSize="clamp(12px, 1.2vw, 14px)"
          height="40px"
          // disable={disable}
        />
        <InputWithLabel
          label="Service Price"
          placeholder="Enter service price"
          labelStyle="input-label"
          type="text"
          name="price"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.price?.message}
        />
      </DetailedSection>

      <DetailedSection>
        <InputWithLabel
            label="Service Timeline"
            placeholder="Enter service timeline"
            labelStyle="input-label"
            type="text"
            name="timeline"
            inputClass="input-class"
            container="input-container-class"
            register={register}
            errorMessage={errors.timeline?.message}
        />
      </DetailedSection>
    </Modal1>
  );
};

export default StaffServiceModal;
