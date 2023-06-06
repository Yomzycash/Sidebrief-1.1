import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/button";
import PromoCodeCard from "components/cards/PromoCodeCard";
import FeatureDetailsHeader from "components/Header/FeatureDetailsHeader";
import { InputWithLabel } from "components/input";
import RadioInput from "components/input/RadioInput";
import ConfirmDelete from "components/modal/ConfirmDelete";
import { compareAsc, format } from "date-fns";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCreatePromoCodeMutation,
  useDeletePromoCodeMutation,
  useGetAllPromoCodesQuery,
  useUpdatePromoCodeMutation,
} from "services/staffService";
import { useActions, usePromoCodeSchema } from "./actions";
import {
  deleteButtonStyle,
  Divider,
  FormButton,
  FormSection,
  PromoDetailsBody,
  PromoDetailsContainer,
  PromoDetailsHeader,
  PromoDetailsLeft,
  PromoDetailsRight,
  PromoForm,
  PromoCodeIcons,
  RecentBody,
  RecentHeader,
  RecentPromoCodes,
} from "./styled";
import { MdAutorenew } from "react-icons/md";
import { AiOutlineCopy } from "react-icons/ai";

const PromoDetails = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState({});

  const navigate = useNavigate();
  const { promoCode } = useParams();

  const { data, refetch } = useGetAllPromoCodesQuery();
  const [createPromoCode, createState] = useCreatePromoCodeMutation();
  const [updatePromoCode, updateState] = useUpdatePromoCodeMutation();
  const [deletePromoCode, deleteState] = useDeletePromoCodeMutation();

  const { getPromoSchema } = usePromoCodeSchema({ data });

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getPromoSchema()),
  });

  const {
    generatePromo,
    copyPromoCode,
    submitForm,
    handleDeletePromo,
    handleActiveToggle,
    handlePromoEdit,
  } = useActions({
    data,
    promoCode,
    createPromoCode,
    updatePromoCode,
    deletePromoCode,
    refetch,
    setValue,
    reset,
    selectedPromo,
    setDeleteConfirm,
  });

  // Populate promo information
  useEffect(() => {
    if (!promoCode || !data) {
      reset();
      generatePromo();
      return;
    }

    const promoInfo = data?.find((el) => el?.promoCode === promoCode);
    setSelectedPromo(promoInfo);

    if (!promoInfo) {
      reset();
      return;
    }

    setValue("promoCode", promoInfo?.promoCode);
    setValue("promoCurrency", promoInfo?.promoCurrency);
    setValue("promoDescription", promoInfo?.promoDescription);
    setValue("promoDiscount", promoInfo?.promoDiscount);
    setValue("promoExpiry", format(new Date(promoInfo?.promoExpiry), "yyyy-MM-dd"));
    setValue("promoMaxAmount", promoInfo?.promoMaxAmount);
    setValue("promoStatus", promoInfo?.promoStatus ? "Active" : "InActive");
  }, [data, promoCode]);

  const currencyOptions = ["NGN", "USD"];
  const statusOptions = ["Active", "InActive"];

  return (
    <PromoDetailsContainer>
      <PromoDetailsHeader>
        <FeatureDetailsHeader
          backText="Back to promo codes"
          backURL="/staff-dashboard/promo-codes"
          title="Promo Codes"
          description="Manage all created promo codess"
          buttonText="Create New"
          buttonAction={() => navigate("/staff-dashboard/promo-codes/create")}
        />
      </PromoDetailsHeader>
      <PromoDetailsBody>
        <PromoDetailsLeft>
          <PromoForm onSubmit={handleSubmit(submitForm)}>
            <InputWithLabel
              inputId="promo-code"
              label="Promo Code"
              labelStyle="input-label"
              type="text"
              name="promoCode"
              inputClass="input-class"
              containerStyle="input-container-class"
              disable={promoCode}
              register={register}
              errorMessage={errors.promoCode?.message}
              overlayComponent={
                <PromoCodeIcons>
                  {!promoCode && (
                    <MdAutorenew size={20} style={{ cursor: "pointer" }} onClick={generatePromo} />
                  )}
                  <AiOutlineCopy
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={copyPromoCode}
                    className="button__effect"
                  />
                </PromoCodeIcons>
              }
            />
            <InputWithLabel
              label="Description"
              labelStyle="input-label"
              type="text"
              name="promoDescription"
              inputClass="input-class"
              containerStyle="input-container-class"
              register={register}
              errorMessage={errors.promoDescription?.message}
            />
            <FormSection>
              <InputWithLabel
                label="Discount"
                labelStyle="input-label"
                type="text"
                name="promoDiscount"
                inputClass="input-class"
                containerStyle="input-container-class"
                register={register}
                errorMessage={errors.promoDiscount?.message}
              />
              <Divider />
              <RadioInput
                label="Currency"
                labelStyle="input-label"
                name="promoCurrency"
                errorMessage={errors.promoCurrency?.message}
                radioOptions={currencyOptions}
                register={register}
              />
            </FormSection>
            <InputWithLabel
              label="Maximum Amount"
              labelStyle="input-label"
              type="number"
              name="promoMaxAmount"
              inputClass="input-class"
              containerStyle="input-container-class"
              register={register}
              errorMessage={errors.promoMaxAmount?.message}
            />
            <FormSection>
              <InputWithLabel
                label="Expiry Date"
                labelStyle="input-label"
                type="date"
                name="promoExpiry"
                inputClass="input-class"
                containerStyle="input-container-class"
                register={register}
                errorMessage={errors.promoExpiry?.message}
              />
              <Divider />
              <RadioInput
                label="Promo Code Status"
                labelStyle="input-label"
                name="promoStatus"
                errorMessage={errors.promoStatus?.message}
                radioOptions={statusOptions}
                register={register}
              />
            </FormSection>
            <FormButton>
              {promoCode && (
                <CommonButton
                  text="Delete"
                  type="button"
                  style={deleteButtonStyle}
                  action={() => setDeleteConfirm(true)}
                />
              )}
              <CommonButton
                text={promoCode ? "Update" : "Create"}
                type="submit"
                loading={createState.isLoading || updateState.isLoading}
              />
            </FormButton>
          </PromoForm>
          <ConfirmDelete
            open={deleteConfirm}
            setOpen={setDeleteConfirm}
            toDelete="promo code"
            loading={deleteState.isLoading}
            handleDelete={handleDeletePromo}
          />
        </PromoDetailsLeft>

        <PromoDetailsRight>
          <RecentPromoCodes>
            <RecentHeader>
              <p>Recently Created Promo Codes</p>
              <Link to="/staff-dashboard/promo-codes">See all</Link>
            </RecentHeader>
            <RecentBody>
              {data
                ?.slice(0, 5)
                ?.sort((a, b) => compareAsc(new Date(b?.promoExpiry), new Date(a?.promoExpiry)))
                ?.map((el, i) => (
                  <PromoCodeCard
                    key={i}
                    promoInfo={el}
                    promoCode={el?.promoCode}
                    discount={el?.promoDiscount + "%"}
                    date={format(new Date(el?.promoExpiry), "dd-MMM-yyyy")}
                    handleActiveToggle={handleActiveToggle}
                    handleEdit={handlePromoEdit}
                  />
                ))}
            </RecentBody>
          </RecentPromoCodes>
        </PromoDetailsRight>
      </PromoDetailsBody>
    </PromoDetailsContainer>
  );
};

export default PromoDetails;
