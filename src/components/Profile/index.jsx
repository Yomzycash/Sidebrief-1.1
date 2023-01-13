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
  };

  return (
    <ProfileContainer>
      <ProfileLists>
        <User />
        <ProfileList>Profile</ProfileList>
      </ProfileLists>
      <ProfileListss>
        <Shield />
        <ProfileList>Change Password</ProfileList>
      </ProfileListss>
      <ProfileLists onClick={handleLogout}>
        <DeleteI />
        <Delete>Logout</Delete>
      </ProfileLists>
    </ProfileContainer>
  );
};

export default Profile;
