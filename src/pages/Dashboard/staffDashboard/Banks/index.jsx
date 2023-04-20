import React, { useEffect } from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import ActiveNav from "components/navbar/ActiveNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "components/button";
import { Puff } from "react-loading-icons";
import PetalsCard from "components/cards/RewardCard/PetalsCard";
import StaffBankModal from "components/modal/StaffBankModal";
import { RewardCard } from "components/cards";
import StaffBankHeader from "components/Header/StaffBankHeader"
import {
    Image, 
    ImageContainer 
  } from "./styled";
import { 
    useUpdateBankMutation,
    useDeleteBankMutation,
    useGetAllBanksQuery,
 } from "services/staffService";
 import { toast } from "react-hot-toast";
 import { handleError } from "utils/globalFunctions";
 import ConfirmDelete from "components/modal/ConfirmDelete";
 import { setRefreshApp } from "redux/Slices";
 import { store } from "redux/Store";


const StaffBank = () => {
    const [selectedBank, setSelectedBank] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const layoutInfo = useSelector((store) => store.LayoutInfo);
    const sidebarWidth = {layoutInfo};
    const navigate = useNavigate();
    const { data, isLoading, isSuccess } = useGetAllBanksQuery({
        refetchOnMountOrArgChange: true,
    });
    const [updateBank, updateState] = useUpdateBankMutation();
    const [ deleteBank, deleteState] = useDeleteBankMutation();

    // const { refreshApp } = useSelector((store) => store.UserDataReducer);

    useEffect(() => {
        let localBankID = localStorage.getItem("bankCode");
        if( localBankID !== null) {
            let bankID = JSON.parse(localBankID);
            const bankData = data === undefined ? [] : [...data];
            const bankDetails = bankData.filter(
              (data) => data.bankCode === bankID
            )
            setSelectedBank(bankDetails)
          } else {
            console.log("Id not found")
          }
    }, [data]);

    // const handleBankClick = (bankID) => {
    //     navigate("/staff-dashboard/bank-accounts/bank/details");
    //     localStorage.setItem("bankId", JSON.stringify(bankID));

    //     const bankIds = localStorage.getItem("bankId");
    //     console.log("bankIds", bankIds)
    // }

    // Returns the data to be sent to the backend
    const getRequiredData = (info) => {
        return {
            bankName:info.bank_name,
            bankDescription:info.description,
            bankCode:info.bank_code,
            bankCountry: info.country,
            bankUrl:info.bank_url,
            bankLogo:info.image
        }
    }

    // Update Bank Function
    const handleUpdate = async (formData) => {
        let requiredData = getRequiredData(formData);
        let response = await updateBank(requiredData);

        let data = response?.data;
        let error = response?.error;

        if(data) {
            toast.success("Bank details updated successfully");
            setOpen(false);

        } else {
            handleError(error);
        }

    }

    // Delete Bank Function
    const handleDelete = async () => {
        let requiredData = selectedBank[0].bankCode;
        let response = await deleteBank(requiredData);

        let data = response?.data;
        let error = response?.error;

        if(data){
            toast.success("Bank deleted successfully");
           setDeleteConfirm(false);
            navigate("/staff-dashboard/bank-accounts");
        } else {
            handleError(error);
        };
    }
    return (
        <BodyRight sidebarWidth={sidebarWidth}>
            <Container>
                <BackContainer onClick={() => navigate("/staff-dashboard/bank-accounts")}>
                    <FiArrowLeft color="#151717" size={24}/>
                    <Text>Back to Banks</Text>
                    
                </BackContainer>
                <TopContainer>
                    {selectedBank?.map((selected, index) => (
                        <TitleContainer key={index}>
                            <LHS>
                                <ImageContainer>
                                    <Image src={selected?.bankLogo}/>
                                </ImageContainer>

                                <DetailWrappper>
                                    <LittleWrapper>
                                        {" "}
                                        <TopText>
                                            {selected?.bankName}
                                        </TopText>
                                        <MiddleText>
                                            {selected?.bankCode}
                                        </MiddleText>
                                    </LittleWrapper>
                                </DetailWrappper>
                            </LHS>

                            <ButtonContainer>
                                <Button title="Update Changes" onClick={() => setOpen(true)}/>
                            </ButtonContainer>
                        </TitleContainer>
                    ))}
                </TopContainer>
                <Outlet/>
                <StaffBankModal
                    cardAction="edit"
                    setOpen={setOpen}
                    bankInfo={selectedBank[0]}
                    open={open}
                    submitAction={handleUpdate}
                    loading={updateState.isLoading}
                />
                {isSuccess && (
                    <Delete onClick={() => setDeleteConfirm(true)}>
                        Delete
                    </Delete>
                )}
                <ConfirmDelete
                    toDelete="Bank"
                    open={deleteConfirm}
                    setOpen={setDeleteConfirm}
                    handleDelete={handleDelete}
                    loading={deleteState.isLoading}
                />
            </Container>
        </BodyRight>
    )
}

export default StaffBank;


const BodyRight = styled.div`
  display: flex;
  flex-flow: row;
  /* width: calc(100% - ${({ SidebarWidth }) => SidebarWidth}); */
  padding: 0px 0px 0px 40px;
  gap: 40px;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

// export const Container = styled.div`
//   display: flex;
//   flex-flow: column;
//   flex: 1;
//   margin: 0 40px;

//   @media screen and (max-width: 1050px) {
//     margin: 0;
//   }
// `;

const Container = styled.header`
  width: 100%;
  padding: 40px;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;

  border-top: none;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #edf1f7;
  border-radius: 16px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 180px;
  align-items: flex-start;
`;


const BackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  align-self: flex-start;
  cursor: pointer;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Text = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #151717;
`;

const TitleContainer = styled.div`
  padding-block: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 40px;
  width: 100%;
`;
const DetailWrappper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;
const LittleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
const TopText = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;

  color: ${({ theme }) => theme.grey1};
`;
const MiddleText = styled.h4`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #4e5152;
`;


const LHS = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
  max-width: 70%;
`;

const RHS = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
  width: 159px;
  height: 44px;
  background-color: ${({ theme }) => theme.blue2};
  border-radius: 8px;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px 12px;
  gap: 8px;
  width: inherit;
`;

const SubHeader = styled.div`
  border-top: 1px solid #edf1f7;
  display: flex;
  gap: 24px;
  padding-inline: 24px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 5px;
    background: ${({ $hovered }) => ($hovered ? "#aaaaaa33" : "#fff")};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ $hovered }) => ($hovered ? "#aaaaaa" : "#fff")};
    border-radius: 15px;
  }

  @media screen and (max-width: 700px) {
    /* border-width: 1px 0px;
      border-style: solid; */
    border-bottom: 1px solid #edf1f7;
    /* border-color: #edf1f7; */
  }
`;

export const Delete = styled.button`
  text-transform: capitalize;
  font-weight: 600;
  font-size: clamp(14px, 1.4vw, 16px);
  padding: 15px;
  background-color: #ffdbdb;
  color: red;
  border: none;
  outline: none;
  max-width: 150px;
  border-radius: 8px;
  transition: 0.3s all ease;

  :hover {
    background-color: #ffb5b5;
  }
  :active {
    transform: scale(0.9);
  }
`;
