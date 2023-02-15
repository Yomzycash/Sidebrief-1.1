import React, { useEffect, useState } from "react";
import { StaffSidebarLinks } from "utils/config";
import {
	ListWrapper,
	Logout,
	LogoutText,
	LogoutWrapper,
	SidebarLinks,
	SidebarWrapper,
	Top,
} from "./styled";
import { HiMenu } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { store } from "redux/Store";
import { setSidebarWidth } from "redux/Slices";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { handleLogout } from "utils/globalFunctions";

const StaffSidebar = () => {
	const [expanded, setExpaned] = useState(() => window.innerWidth > 1050);

	const location = useLocation();

	let homePath = location.pathname === "/staff-dashboard" ? true : false;

	const sidebarVariants = {
		true: {
			width: "236px",
		},
		false: {
			width: "0px",
		},
	};

	useEffect(() => {
		store.dispatch(
			setSidebarWidth(expanded ? sidebarVariants.true.width : "100px")
		);
	}, [expanded]);

	return (
		<SidebarWrapper
			width="100px"
			key="sidebar"
			variants={sidebarVariants}
			animate={expanded ? `${expanded}` : ""}
		>
			<Top>
				<ListWrapper onClick={() => setExpaned(!expanded)}>
					<HiMenu color="#00A2D4" size={24} />
				</ListWrapper>
				<SidebarLinks>
					{StaffSidebarLinks.map((item, index) => (
						<SidebarItem
							key={index}
							item={item}
							expanded={expanded}
							homePath={homePath}
						/>
					))}
				</SidebarLinks>
			</Top>

			<Logout>
				<LogoutWrapper onClick={handleLogout}>
					<HiOutlineLogout color="#ed4e3a" size={20} />
					{expanded ? (
						<LogoutText onClick={handleLogout}>Logout</LogoutText>
					) : null}
				</LogoutWrapper>
			</Logout>
		</SidebarWrapper>
	);
};

export default StaffSidebar;
