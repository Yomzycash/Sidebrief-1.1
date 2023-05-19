import React, {useState} from "react"
import { Container, Heading, Top, SubHeader } from "../styles";
import { Search } from "../search";
import ActiveNav from "components/navbar/ActiveNav";
import CustomDropdown from "components/input/CustomDropdown";
import { useMediaQuery } from "@mui/material";
import MobileStaff from "layout/MobileStaff";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export const StaffSettingHeader = () => {
	const matches = useMediaQuery("(max-width:700px)");
	const navigate = useNavigate();

	let options = [
		"General Details",
		"Notifications",
		"User permissions",
	];

	let pathNavigation = {
		"General Details": "general",
		Notifications : "notification",
		"User permissions": "user-permissions",
	}

	const selectedValue = (option) => {
		navigate(`/staff-dashboard/settings/${pathNavigation[option]}`)
	}

	return (
		<Container>
			<Top>
				<Heading>Settings</Heading>
				<Search triggerSearch={() => {}} />
			</Top>
			{!matches ? (
				<SubHeader>
				<ActiveNav
						text={"General Details"}
						path={`/staff-dashboard/settings/general`}
					/>
					<ActiveNav
						text={"Notifications"}
						path={`/staff-dashboard/settings/notification`}
					/>
					<ActiveNav
						text={"User permissions"}
						path={`/staff-dashboard/settings/user-permissions`}
					/>
				</SubHeader>
			): (
				<NavWrapper>
					<CustomDropdown
						intialvalue={"General Details"}
						options={options}
						selectedValue={selectedValue}
					/>
				</NavWrapper>
				
			)}
		</Container>
	);
};

const NavWrapper = styled.div`
	padding:0 24px;
`
