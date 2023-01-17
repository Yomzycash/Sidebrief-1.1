import React, { useEffect } from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { ReactComponent as Hide } from "asset/svg/Hide.svg";
import { ReactComponent as GladeIcon } from "../../../../asset/images/Glade.svg";
import ActiveNav from "components/navbar/ActiveNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "components/navbar";
import StaffSidebar from "components/sidebar/StaffSidebar";
import { useSelector } from "react-redux";
import Button from "components/button";
import { useGetAllRewardsQuery } from "services/RewardService";
import { Image, ImageContainer } from "./style";
import StaffRewardModal from "components/modal/StaffRewardModal";
import {
  useDeleteRewardMutation,
  useUpdateRewardMutation,
} from "services/staffService";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";

const StaffReward = () => {
  const [selectedReward, setSelectedReward] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  const { data, isLoading, isError, isSuccess } = useGetAllRewardsQuery({
    refetchOnMountOrArgChange: true,
  });
  const [updateReward, updateState] = useUpdateRewardMutation();
  const [deleteReward, deleteState] = useDeleteRewardMutation();

  useEffect(() => {
    let localRewardID = localStorage.getItem("rewardId");
    let rewardID = JSON.parse(localRewardID);
    const rewardData = data === undefined ? [] : [...data];
    const rewardDatails = rewardData.filter(
      (data) => data.rewardID === rewardID
    );
    setSelectedReward(rewardDatails);
  }, [data]);

  const getRequiredData = (info) => ({
    rewardID: selectedReward[0].rewardID,
    rewardCategory: info.category,
    rewardCode: info.code,
    rewardDescription: info.description,
    rewardImage: info.image,
    rewardLink: info.link,
    rewardName: info.reward_name,
    rewardPartner: info.partner,
  });

  // This updates a reward information
  const handleUpdate = async (formData) => {
    let requiredData = getRequiredData(formData);
    let response = await updateReward(requiredData);

    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Reward updated successfully");
    } else {
      handleError(error);
    }
  };

  // This deletes a reward information
  const handleDelete = async (formData) => {
    let requiredData = getRequiredData(formData);
    let response = await deleteReward(requiredData);

    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Reward deleted successfully");
    } else {
      handleError(error);
    }
  };

  return (
    <BodyRight SidebarWidth={sidebarWidth}>
      <Container>
        <BackContainer onClick={() => navigate("/staff-dashboard/all-rewards")}>
          <FiArrowLeft color="#151717" size={24} />
          <Text>Back to Rewards</Text>
        </BackContainer>
        <TopContainer>
          {selectedReward?.map((selected, index) => (
            <TitleContainer key={index}>
              <LHS>
                <ImageContainer>
                  <Image src={selected?.rewardImage} />
                </ImageContainer>

                <DetailWrappper>
                  <LittleWrapper>
                    {" "}
                    <TopText>
                      {selected?.rewardName}
                      {selected?.rewardPartner}
                    </TopText>
                    <MiddleText>{selected?.rewardPartner}</MiddleText>
                  </LittleWrapper>
                  {/* Do not remove, it will be needed later */}
                  {/* <BottomText>
                    Created 12th August, 2022 by Esther Ashimolowo
                  </BottomText> */}
                </DetailWrappper>
              </LHS>

              <ButtonContainer>
                <Button title="Update Changes" onClick={() => setOpen(true)} />
              </ButtonContainer>
              {/* <RHS>
                <RightWrapper>
                  <Hide />
                  <BlockText>Make Public</BlockText>
                </RightWrapper>
              </RHS> */}
            </TitleContainer>
          ))}

          <SubHeader
          // onMouseEnter={() => setSubHeaderHovered(true)}
          // onMouseLeave={() => setSubHeaderHovered(false)}
          // $hovered={subHeaderHovered}
          >
            <ActiveNav
              text={"Reward Details"}
              path="/staff-dashboard/all-rewards/reward/details"
            />
            <ActiveNav
              text={"Analytics"}
              path="/staff-dashboard/all-rewards/reward/analytics"
            />
          </SubHeader>
        </TopContainer>
        <Outlet />
        <StaffRewardModal
          cardAction="edit"
          open={open}
          setOpen={setOpen}
          rewardInfo={selectedReward[0]}
          submitAction={handleUpdate}
          loading={updateState.isLoading}
        />
        <Delete>Delete</Delete>
      </Container>
    </BodyRight>
  );
};

export default StaffReward;

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

const Top = styled.div`
  padding-inline: 40px;
  padding-block: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

  color: #242627;
`;
const MiddleText = styled.h4`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #4e5152;
`;
const BottomText = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  color: #959697;
`;

const ImageWrapper = styled.div``;
const CountryName = styled.h2`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  /* Grey 3 */

  color: #4e5152;
`;

const LHS = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
`;

const RHS = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
  width: 159px;
  height: 44px;
  background-color: #00a2d4;
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
const BlockText = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;

  color: #ffffff;
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
  font-weight: 700;
  padding: 10px;
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
