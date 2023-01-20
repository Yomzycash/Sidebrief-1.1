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
const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    console.log("User logged out");
  };

  return (
    <ProfileContainer>
      <ProfileLists>
        <User />
        <ProfileList>Profile</ProfileList>
      </ProfileLists>
      <ProfileLists onClick={handleLogout}>
        <DeleteI />
        <Delete onClick={handleLogout}>Logout</Delete>
      </ProfileLists>
    </ProfileContainer>
  );
};

export default Profile;
