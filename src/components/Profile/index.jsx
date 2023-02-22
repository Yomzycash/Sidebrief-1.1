import React from "react";
import { ProfileContainer, Delete, ProfileLists, ProfileList } from "./style";
import { ReactComponent as User } from "../../asset/svg/user.svg";
import { ReactComponent as DeleteI } from "../../asset/svg/de.svg";
import { useNavigate } from "react-router-dom";
import { checkStaffEmail, handleLogout } from "utils/globalFunctions";

const Profile = ({ setShowProfile }) => {
	const navigate = useNavigate();
	let userEmail = localStorage.getItem("userEmail");
  	let staffEmail = checkStaffEmail(userEmail);
	
	const handleProfile = () => {
		navigate( staffEmail ? "/staff-dashboard/settings/general" : "/dashboard/settings/personal");
		setShowProfile(false);	
	};

	return (
		<ProfileContainer>
			<ProfileLists onClick={handleProfile}>
				<User />
				<ProfileList onClick={handleProfile}>Profile</ProfileList>
			</ProfileLists>
			<ProfileLists onClick={() => handleLogout(navigate)}>
				<DeleteI />
				<Delete onClick={() => handleLogout(navigate)}>Logout</Delete>
			</ProfileLists>
		</ProfileContainer>
	);
};

export default Profile;
