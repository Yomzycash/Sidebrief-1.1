import StaffRewardHeader from "components/Header/StaffRewardHeader";
// import Navbar from "components/navbar";
// import StaffSidebar from "components/sidebar/StaffSidebar";
import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  // Body,
  // BodyLeft,
  BodyRight,
  // Container,
  ListItem,
  ListItems,
  ListItemsContainer,
  RewardContainer,
  Loading,
  DropdownContent,
  DropdownButton,
  DropdownIcon,
  ArrowDown,
  DropdownWrapper, 
  DropdownContainer,
  CategoryText

} from "./style";
import { useSelector } from "react-redux";
import { RewardCard } from "components/cards";
// import { myRewards } from "utils/config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllRewardsQuery } from "services/RewardService";
import { Puff } from "react-loading-icons";
import StaffRewardModal from "components/modal/StaffRewardModal";
import { useAddRewardMutation } from "services/staffService";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";
import { useMediaQuery } from "@mui/material";
import CustomDropdown from "components/input/CustomDropdown";


const StaffAllRewards = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;
  const navigate = useNavigate();
  const [allRewards, setAllRewards] = useState([]);
  const [rewardsCategories, setRewardscategories] = useState(["All"]);
  const [filteredReward, setFilteredReward] = useState([]);
  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch } = useGetAllRewardsQuery();
  const [category, setCategory] = useSearchParams();
  const [addReward, addState] = useAddRewardMutation();

  const [isActive, setIsActive] = useState(false)
  // let errorRef = useRef(true);
  const matches = useMediaQuery("(max-width:700px)")
  useEffect(() => {
    setAllRewards(data);
    setRewardscategories((prev) => {
      const categories = data
        ? data.map((element) => element.rewardCategory)
        : [];

      return [...new Set([...prev, ...categories])];
    });
    const total = data?.length;
    localStorage.setItem("totalStaffRewards", JSON.stringify(total));
    refetch();
    // if (isError && errorRef.current === true) {
    //   handleError(error);
    //   errorRef.current = false;
    // }
  }, [data, refetch]);

  const rewardsList = data?.map((el) => {
    return el?.rewardCategory
  })
  console.log("rew", data);
  console.log("rewardsList", rewardsList)

  const all = ["All"]
  const rewardsCategory = [].concat(rewardsCategories )

  useEffect(() => {
    let selectedCategory = category.get("category");
    switch (selectedCategory) {
      case null:
      case "All":
        setFilteredReward(allRewards);
        break;
      default:
        let filtered = allRewards?.filter(
          (reward) => reward?.rewardCategory === selectedCategory
        );
        setFilteredReward(filtered);
        break;
    }
  }, [category, allRewards]);

  const handleRewardClick = (rewardID) => {
    navigate("/staff-dashboard/all-rewards/reward/details");
    localStorage.setItem("rewardId", JSON.stringify(rewardID));

    
  };

  const handleCategory = (category) => {
    setCategory({ category });
  };

  // Returns the data to be sent to the backend
  const getRequired = (formData) => {
    return {
      rewardName: formData.reward_name,
      rewardDescription: formData.description,
      rewardPartner: formData.partner,
      rewardCode: formData.code,
      rewardCategory: formData.category,
      rewardImage: formData.image,
      rewardLink: formData.link,
    };
  };

  // This functtion is used to add a reward. It runs when the form gets submitted.
  const submitAction = async (formData) => {
    let requiredData = getRequired(formData);
    let response = await addReward(requiredData);
    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Reward added successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

  return (
    <BodyRight SidebarWidth={sidebarWidth}>
      <StaffRewardHeader setOpen={setOpen} />
      {/* beginning */}
      {/* {!matches ? (
          <ListItemsContainer>
            <ListItems>
              <h3>Categories</h3>
              {rewardsCategories?.map((cat, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleCategory(cat)}
                  style={{
                    color: cat === category.get("category") ? "#00A2D4" : "",
                  }}
                >
                  {cat}
                </ListItem>
              ))}
            </ListItems>
          </ListItemsContainer>
      ) : (
        <ListItemsContainer>
          <h3>Categories</h3>
          <DropdownContent>
            <DropdownWrapper>
              {category.get("category")}
              <DropdownIcon>
              ✔️
              </DropdownIcon>
               <ArrowDown onClick={() => setIsActive(!isActive)} isActive={isActive} >
                <IoIosArrowDown />
              </ArrowDown>
            </DropdownWrapper>
            {isActive &&
               <ListItems>
               {rewardsCategories?.map((cat, index) => (
                 <ListItem
                   key={index}
                   onClick={() => handleCategory(cat)}
                   style={{
                     color: cat === category.get("category") ? "#00A2D4" : "",
                   }}
                 >
                   {cat}
                 </ListItem>
               ))}
             </ListItems>
            }
           
          </DropdownContent>
        </ListItemsContainer>
      )} */}
      {/* end */}
      <DropdownContainer>
        <DropdownWrapper>
          <CategoryText>Category</CategoryText>
          <CustomDropdown
                options={rewardsCategory}
                intialvalue="All"
                selectedValue={handleCategory}
            />
        </DropdownWrapper>
      </DropdownContainer>
       
      

      {isLoading ? (
        <Loading height="300px">
          <Puff stroke="#00A2D4" fill="white" width={60} />
        </Loading>
      ) : (
        <RewardContainer>
          {filteredReward &&
            filteredReward?.map((reward, index) => (
              <RewardCard
                key={index}
                title={reward?.rewardPartner}
                body={reward?.rewardName}
                rewardspage
                action={() => handleRewardClick(reward.rewardID)}
                image={reward?.rewardImage}
              />
            ))}
        </RewardContainer>
      )}
      <StaffRewardModal
        setOpen={setOpen}
        open={open}
        submitAction={submitAction}
        loading={addState.isLoading}
      />
    </BodyRight>
  );
};

export default StaffAllRewards;
