import React, { useState } from "react";
import {
	Container,
	TextContainer,
	ThreeDotContainer,
	Name,
	Top,
	Description,
	ContextMenu,
	ContextButton,
	DeleteButton,
	InvisibleBackDrop,
	Wrapper,
} from "./styles";
import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";
import { StatusIndicator } from "components/Indicators";
import { ViewSvg, EditGreySvg, DeleteRedSvg } from "asset/svg";
import { useActions } from "./actions";
import { useNavigate } from "react-router-dom";
import { DeleteLaunchModal } from "components/modal/DeleteLaunchModal";
import { useViewPayLaunchMutation } from "services/launchService";
import { Puff } from "react-loading-icons";
import { navigateToDetailPage } from "components/Tables/BusinessTable/constants";
import { ThreeDotMenu } from "components/Menu";

export const StatusCard = ({
	name, // string
	status,
	ShortDescription,
	launchInfo,
}) => {
	const [hover, setHover] = useState(false);
	const [showContext, setShowContext] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	const navigate = useNavigate();

	const [viewPayLaunch, viewPayState] = useViewPayLaunchMutation();

	const {
		toggleContext,
		deleteAction,
		editAction,
		hideContext,
		viewAction,
		hideDeleteModal,
	} = useActions({
		setShowContext,
		navigate,
		setShowDelete,
		launchInfo,
		viewPayLaunch,
	});

	const contextContent = [
		{
			text: "View",
			Icon: ViewSvg,
			action: viewAction,
			style: "normal",
		},
		{
			text: "Edit",
			Icon: EditGreySvg,
			action: editAction,
			style: "normal",
		},
		{
			text: "Delete",
			Icon: DeleteRedSvg,
			action: deleteAction,
			style: "danger",
		},
	];

	return (
		<Wrapper>
			<Container
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				hover={hover}
				onClick={() => navigateToDetailPage(navigate, launchInfo)}
			>
				<TextContainer>
					<Top>
						<Name>{name}</Name>
						<StatusIndicator status={status} />
					</Top>
				</TextContainer>
				<Description hover={hover}>{ShortDescription}</Description>
			</Container>
			<ThreeDotMenu contextContent={contextContent} />
			{showDelete ? (
				<>
					<InvisibleBackDrop onClick={hideDeleteModal} />
					<DeleteLaunchModal
						hide={hideDeleteModal}
						launchCode={launchInfo.launchCode}
					/>
				</>
			) : null}
		</Wrapper>
	);
};
