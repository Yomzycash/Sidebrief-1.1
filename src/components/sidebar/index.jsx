import React, { useEffect, useState } from "react";
import { sidebarLink } from "utils/config";
import {
	ListWrapper,
	Logout,
	LogoutText,
	LogoutWrapper,
	SidebarContentItemIcon,
	SidebarContentItemLink,
	SidebarLinks,
	SidebarWrapper,
	SideLinkWrapper,
	Top,
} from "./styled";
import { HiMenu } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { store } from "redux/Store";
import { setSidebarWidth } from "redux/Slices";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { handleLogout } from "utils/globalFunctions";

const Sidebar = () => {
	const [iconHovered, setIconHovered] = useState(0);

	const location = useLocation();
	const locationPath = location.pathname;

	const navigate = useNavigate();
	const [expanded, setExpaned] = useState(() => window.innerWidth > 1050);

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

	const ActiveStyle = {
		background: "#00a2d419",
		color: "#00a2d4",
	};

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
					{sidebarLink.map((item, index) => (
						<SideLinkWrapper key={index}>
							{
								<NavLink
									to={item.path}
									style={({ isActive }) =>
										isActive ? ActiveStyle : {}
									}
									onMouseEnter={() => setIconHovered(item.id)}
									onMouseLeave={() => setIconHovered(0)}
								>
									<SidebarContentItemIcon>
										<item.icon
											filled={locationPath?.includes(
												item.path
											)}
											hover={iconHovered === item.id}
										/>
									</SidebarContentItemIcon>
									<SidebarContentItemLink>
										{expanded ? item.title : null}
									</SidebarContentItemLink>
								</NavLink>
							}
						</SideLinkWrapper>
					))}
				</SidebarLinks>
			</Top>

			<Logout>
				<LogoutWrapper onClick={() => handleLogout(navigate)}>
					<HiOutlineLogout color="#ed4e3a" size={20} />
					{expanded ? (
						<LogoutText onClick={() => handleLogout(navigate)}>
							Logout
						</LogoutText>
					) : null}
				</LogoutWrapper>
			</Logout>
		</SidebarWrapper>
	);
};

export default Sidebar;
