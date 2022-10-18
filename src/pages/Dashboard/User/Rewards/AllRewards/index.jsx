import { RewardCard, RewardSummaryCard } from "components/cards";
import React, { useEffect, useRef, useState } from "react";
import {
	Body,
	BodyLeft,
	BodyRight,
	Container,
	Footer,
	Loading,
} from "./styled";
import { useNavigate, useSearchParams } from "react-router-dom";
import { store } from "redux/Store";
import { setAllAvailableRewards, setRewardsPageHeader } from "redux/Slices";
import { useGetAllRewardsQuery } from "services/RewardService";
import { Puff } from "react-loading-icons";

// const rewardsCategories = ["All", "Human Resources", "Productivity"];

const AllRewards = () => {
	const [allRewards, setAllRewards] = useState([]);
	const [filteredReward, setFilteredReward] = useState([]);
	const [rewardsCategories, setRewardscategories] = useState(["All"]);

	const [category, setCategory] = useSearchParams();

	const { data, isLoading, isError, isSuccess } = useGetAllRewardsQuery();

	const navigate = useNavigate();

	// This displays rewards header for this page
	useEffect(() => {
		store.dispatch(setRewardsPageHeader(true));
	}, []);

	const handleRewardClick = (rewardID) => {
		navigate(`/dashboard/rewards/${rewardID}`);
	};

	const handleCategory = (category) => {
		setCategory({ category }); // Set category as an object to the searchParams
	};

	// set to state the fetched rewards from backend
	useEffect(() => {
		setAllRewards(data);
		setRewardscategories((prev) => {
			const categories = data
				? data.map((element) => element.rewardCategory)
				: [];

			return [...new Set([...prev, ...categories])];
		});
		store.dispatch(setAllAvailableRewards(data));
	}, [data]);

	// handles the rewards by category
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

	return (
		<Container>
			<Body>
				{isLoading ? (
					<Loading height="300px">
						<Puff stroke="#00A2D4" fill="white" width={60} />
					</Loading>
				) : (
					<>
						<BodyLeft>
							<h3>Categories</h3>
							<ul>
								{rewardsCategories?.map((cat, index) => (
									<li
										key={index}
										onClick={() => handleCategory(cat)}
										style={{
											color:
												cat === category.get("category")
													? "#00A2D4"
													: "",
										}}
									>
										{cat}
									</li>
								))}
							</ul>
						</BodyLeft>
						<BodyRight>
							{filteredReward?.map((reward, index) => (
								<RewardCard
									key={index}
									title={reward?.rewardPartner}
									body={reward?.rewardName}
									image={reward?.rewardImage}
									action={() =>
										handleRewardClick(reward.rewardID)
									}
									rewardspage
								/>
							))}
						</BodyRight>
					</>
				)}
			</Body>
			<Footer></Footer>
		</Container>
	);
};

export default AllRewards;
