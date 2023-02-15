import React from "react";
import { ProfileContainer, Delete, ProfileLists, ProfileList } from "./style";
import { ReactComponent as User } from "../../asset/svg/user.svg";
import { ReactComponent as DeleteI } from "../../asset/svg/de.svg";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "utils/globalFunctions";

const Profile = ({ setShowProfile }) => {
	const navigate = useNavigate();

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
