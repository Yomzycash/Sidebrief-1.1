import React from "react";
import {
	ProfileContainer,
	ProfileListss,
	Delete,
	ProfileLists,
	ProfileList,
} from "./style";
import { ReactComponent as User } from "../../asset/svg/user.svg";
import { ReactComponent as Shield } from "../../asset/svg/sh.svg";
import { ReactComponent as DeleteI } from "../../asset/svg/de.svg";
import { useNavigate } from "react-router-dom";
const Profile = ({ setShowProfile }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		navigate("/login");
		// console.log("User logged out");
	};

	const handleProfile = () => {
		navigate("/dashboard/settings/personal");
		setShowProfile(false);
	};

	return (
		<ProfileContainer>
			<ProfileLists onClick={handleProfile}>
				<User />
				<ProfileList onClick={handleProfile}>Profile</ProfileList>
			</ProfileLists>
			<ProfileLists onClick={handleLogout}>
				<DeleteI />
				<Delete onClick={handleLogout}>Logout</Delete>
			</ProfileLists>
		</ProfileContainer>
	);
};

export default Profile;
