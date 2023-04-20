import StaffRewardDetails from "components/staffRewardDetails";
import React, { useEffect, useState } from "react";
import { useGetAllRewardsQuery } from "services/RewardService";
import { Body, Container, Loading } from "./style";
import { Puff } from "react-loading-icons";

const StaffRewardDetailsPage = () => {
  const [selectedReward, setSelectedReward] = useState([]);
  const { data, isLoading } = useGetAllRewardsQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    let localRewardID = localStorage.getItem("rewardId");
    let rewardID = JSON.parse(localRewardID);
    const rewardData = data === undefined ? [] : [...data];
    const rewardDatails = rewardData.filter(
      (data) => data.rewardID === rewardID
    );
    setSelectedReward(rewardDatails);
  }, [data]);
  // console.log("sayyyyy", selectedReward);
  return (
    <Container>
      <Body>
        {isLoading ? (
          <Loading height="300px">
            <Puff stroke="#00A2D4" fill="white" width={60} />
          </Loading>
        ) : (
          <StaffRewardDetails selectedReward={selectedReward} />
        )}
      </Body>
    </Container>
  );
};

export default StaffRewardDetailsPage;
