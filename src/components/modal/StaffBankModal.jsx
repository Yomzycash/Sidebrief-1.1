import React, { useEffect, useState} from "react";
import { DropDown, InputWithLabel } from "components/input";
import Modal1 from "layout/modal1";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DetailedSection } from "containers/Checkout/InfoSection/style";
import { BankAccountSchema } from "utils/config";
import { useGetAllBanksQuery } from "services/staffService";
import { useGetAllCountriesQuery } from "services/launchService";

const StaffBankModal = ({
    cardAction,
    open,
    setOpen,
    loading,
    submitAction,
    bankInfo
}) => {
    const [ countries, setCountries ] = useState([{ value: "", label: "" }]);
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(BankAccountSchema),
    });

    const {data, isLoading} = useGetAllBanksQuery();

    const allCountries = useGetAllCountriesQuery();

    useEffect(() => {
        let countries = allCountries.data ?  allCountries.data?.map((country) => country.countryISO) : [];

        setCountries(
            countries 
                ? [...new Set(countries)].map((cont) => ({
                    value:cont,
                    label:cont
                })) : []
            );
    }, [data])

    const handleCountryChange = (value) => {
        let country = Object.values(value)[0];
        setValue("country", country, {shouldValidate : true});
    }

    useEffect(() => {
        if(cardAction === "edit" && bankInfo ){
            setValue("bank_name", bankInfo.bankName, {
                shouldValidate: true,
            });
            setValue("description", bankInfo.bankDescription, {
                shouldValidate: true,
            });
            setValue("bank_code", bankInfo.bankCode, {
                shouldValidate: true,
            });
            setValue("country", bankInfo.bankCountry, {
                shouldValidate: true,
            });
            setValue("bank_url", bankInfo.bankUrl, {
                shouldValidate: true,
            });
            setValue("image", bankInfo.bankLogo, {
                shouldValidate: true,
            });
            }
    }, [bankInfo]);

    return (
        <Modal1
            handleSubmit={handleSubmit }
            submitAction={submitAction}
            cardAction={cardAction}
            title={cardAction === "edit" ? "Update Bank" : "Add New Bank"}
            open={open}
            setOpen={setOpen}
            loading={loading}
            $hideIcons
        >
            <DetailedSection>
                <InputWithLabel
                    label="Bank Name"
                    labelStyle="input-label"
                    placeholder="Enter bank name"
                    type="text"
                    name="bank_name"
                    inputClass="input-class"
                    containerStyle="input-container-class"
                    register={register}
                    errorMessage={errors.bank_name?.message}
                />
                <InputWithLabel
                    label="Bank Code"
                    labelStyle="input-label"
                    placeholder="Enter bank code"
                    type="text"
                    name="bank_code"
                    inputClass="input-class"
                    containerStyle="input-container-class"
                    register={register}
                    errorMessage={errors.bank_code?.message}
                />
            </DetailedSection>
            <DetailedSection>
                <InputWithLabel
                     label="Description"
                     labelStyle="input-label"
                     placeholder="Enter bank description"
                     type="text"
                     name="description"
                     inputClass="input-class"
                     containerStyle="input-container-class"
                     register={register}
                     errorMessage={errors.description?.message}
                />
            </DetailedSection>

            <DetailedSection>
                <DropDown
                    containerStyle={{ margin: 0, marginBottom: "24px" }}
                    label="Country"
                    name="country"
                    placeholder="Select Country"
                    options={countries}
                    onChange={handleCountryChange}
                    errorMessage={errors.country?.message}
                    cardAction={cardAction}
                    defaultValue={bankInfo ? bankInfo.bankCountry : ""}
                    fontSize="clamp(12px, 1.2vw, 14px)"
                    height="40px"
                />

                <InputWithLabel
                    label="Bank Url"
                    placeholder="Enter designated bank url"
                    labelStyle="input-label"
                    type="text"
                    name="bank_url"
                    inputClass="input-class"
                    containerStyle="input-container-class"
                    register={register}
                    errorMessage={errors.bank_url?.message}
                />
            </DetailedSection>

            <DetailedSection>
                <InputWithLabel
                    label="Image"
                    placeholder="Enter link to bank image"
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
    )
}

export default StaffBankModal
