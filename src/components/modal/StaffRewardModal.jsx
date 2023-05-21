import { DropDown, InputWithLabel } from "components/input";
import Modal1 from "layout/modal1";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import NumberInput from "components/input/phoneNumberInput";
import { useState } from "react";
import { StaffCountrySchema, StaffRewardSchema } from "utils/config";
import KYCFileUpload from "components/FileUpload/KYCFileUpload";
import { useGetAllRewardsQuery } from "services/RewardService";
import { useEffect } from "react";
import { useAddRewardMutation } from "services/staffService";

const StaffRewardModal = ({
  cardAction,
  open,
  setOpen,
  loading,
  submitAction,
  rewardInfo,
}) => {
  const [categories, setCategories] = useState([{ value: "", label: "" }]);

  const { data, isLoading, isError, isSuccess } = useGetAllRewardsQuery();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StaffRewardSchema),
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
      title={cardAction === "edit" ? "Update Reward" : "Add New Reward"}
      open={open}
      setOpen={setOpen}
      loading={loading}
      $hideIcons
    >
      <DetailedSection>
        <InputWithLabel
          label="Name"
          labelStyle="input-label"
          placeholder="Enter reward name"
          type="text"
          name="reward_name"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.reward_name?.message}
        />
        <InputWithLabel
          label="Partner"
          labelStyle="input-label"
          placeholder="Enter partner name"
          type="text"
          name="partner"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.partner?.message}
        />
      </DetailedSection>

      <InputWithLabel
        label="Description"
        labelStyle="input-label"
        placeholder="Enter reward description"
        type="text"
        name="description"
        inputClass="input-class"
        containerStyle="input-container-class"
        register={register}
        errorMessage={errors.description?.message}
      />

      <DetailedSection>
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
        <InputWithLabel
          label="Code"
          placeholder="Enter reward code"
          labelStyle="input-label"
          type="text"
          name="code"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.code?.message}
        />
      </DetailedSection>

      <DetailedSection>
        <InputWithLabel
          label="Link"
          placeholder="Enter link to reward"
          labelStyle="input-label"
          type="text"
          name="link"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.link?.message}
        />
        <InputWithLabel
          label="Image"
          placeholder="Enter link to reward image"
          labelStyle="input-label"
          type="text"
          name="image"
          inputClass="input-class"
          containerStyle="input-container-class"
          register={register}
          errorMessage={errors.image?.message}
        />
      </DetailedSection>
    </Modal1>
  );
};

export default StaffRewardModal;
