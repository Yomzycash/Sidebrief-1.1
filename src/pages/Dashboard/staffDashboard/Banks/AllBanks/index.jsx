import React, { useEffect, useState } from 'react'
import StaffBankHeader from "components/Header/StaffBankHeader"
import {
    // Body,
    // BodyLeft,
    BodyRight,
    // Container,
    ListItem,
    ListItems,
    ListItemsContainer,
    BankContainer,
    Loading,
  } from "./style";
import { useSelector } from "react-redux";
import { Puff } from "react-loading-icons";
import PetalsCard from "components/cards/RewardCard/PetalsCard";
import StaffBankModal from "components/modal/StaffBankModal";
import { RewardCard } from "components/cards";
import { 
    useGetAllBanksQuery,
    useAddBankMutation,

 } from "services/staffService";
 import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { handleError } from "utils/globalFunctions";


const Banks = () => {
    const [open, setOpen] = useState(false);
    const [filteredBanks, setFilteredBanks] = useState([]);
    const layouInfo = useSelector((store) => store.LayoutInfo);
    const sidebarWidth = {layouInfo};
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useGetAllBanksQuery();
    const [addBank, addState] = useAddBankMutation();



    useEffect(() => {
        setFilteredBanks(data);
    }, [data])

    const handleBankClick = (bankCode) => {
        navigate("/staff-dashboard/bank-accounts/bank/details");
        localStorage.setItem("bankCode", JSON.stringify(bankCode));
    }

    // Returns the data to be sent to the backend
    const getRequired = (formData) => {
        return {
            bankName:formData.bank_name,
            bankDescription:formData.description,
            bankCode:formData.bank_code,
            bankCountry: formData.country,
            bankUrl:formData.bank_url,
            bankLogo:formData.image
        }
    }

    // This functtion is used to add a reward. It runs when the form gets submitted.
    const submitAction = async (formData) => {
        let requiredData = getRequired(formData)
        let response = await addBank(requiredData);
        let data = response?.data;
        let error = response?.error;

        if(data){
            toast.success("Bank added succcessfully");
            setOpen(false);
        } else {
            handleError(error)
        }
        refetch();
    }
    return (
        <BodyRight sidebarWidth={sidebarWidth}>
            <StaffBankHeader setOpen={setOpen} />
            { isLoading ? (
                <Loading height="300px">
                    <Puff stroke="#00A2D4" fill="white" width={60} />
              </Loading>
            ) : (
               <BankContainer>
                    {filteredBanks?.map((bank, index) => (
                        <RewardCard
                            key={index}
                            title={bank?.bankCountry}
                            body={bank?.bankName}
                            image={bank?.bankLogo}
                            submitAction={submitAction}
                            action={() => handleBankClick(bank.bankCode)}
                            rewardspage
                        />
                    ))}
               </BankContainer>
            )}
            <StaffBankModal
                setOpen={setOpen}
                open={open}
                submitAction={submitAction}
                loading={addState.isLoading}
            />
        </BodyRight>
    )
}

export default Banks