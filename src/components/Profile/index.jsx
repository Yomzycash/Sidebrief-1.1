import React from "react";
import { ProfileContainer, Delete, ProfileLists, ProfileList } from "./style";
import { ReactComponent as User } from "../../asset/svg/user.svg";
import { ReactComponent as DeleteI } from "../../asset/svg/de.svg";
import { useNavigate } from "react-router-dom";
import { checkStaffEmail, handleLogout } from "utils/globalFunctions";
import { useEffect } from "react";
import { useRef } from "react";

const Profile = ({ handleProfileToggle }) => {
  const navigate = useNavigate();
  const profileRef = useRef();
  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!profileRef.current.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        handleProfileToggle();
      }
    };
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  });

  const handleProfile = () => {
    navigate(
      staffEmail
        ? "/staff-dashboard/settings/general"
        : "/dashboard/settings/personal"
    );
  };

  return (
    <ProfileContainer ref={profileRef}>
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
