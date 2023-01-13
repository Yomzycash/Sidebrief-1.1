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
} from "./styles";
import { ReactComponent as ThreeDot } from "asset/svg/threeDot.svg";
import { StatusIndicator } from "components/Indicators";
import { ViewSvg, EditGreySvg, DeleteRedSvg } from "asset/svg";
import { useActions } from "./actions";
import { useNavigate } from "react-router-dom";
import { DeleteLaunchModal } from "components/modal/DeleteLaunchModal";

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

	const {
		toggleContext,
		deleteAction,
		editAction,
		hideContext,
		viewAction,
		hideDeleteModal,
	} = useActions({ setShowContext, navigate, setShowDelete });

	return (
		<Container
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			hover={hover}
		>
			<TextContainer>
				<Top>
					<Name>{name}</Name>
					<StatusIndicator status={status} />
				</Top>
				<ThreeDotContainer onClick={toggleContext}>
					<ThreeDot />
				</ThreeDotContainer>
			</TextContainer>
			{showContext ? (
				<>
					<InvisibleBackDrop onClick={hideContext} />
					<ContextMenu>
						<ContextButton onClick={() => viewAction(launchInfo)}>
							<ViewSvg /> View
						</ContextButton>
						<ContextButton onClick={editAction}>
							<EditGreySvg /> Edit
						</ContextButton>
						<DeleteButton onClick={deleteAction}>
							<DeleteRedSvg />
							Delete
						</DeleteButton>
					</ContextMenu>
				</>
			) : null}
			{showDelete ? (
				<>
					<InvisibleBackDrop onClick={hideDeleteModal} />
					<DeleteLaunchModal
						hide={hideDeleteModal}
						launchCode={launchInfo.launchCode}
					/>
				</>
			) : null}
			<Description hover={hover}>{ShortDescription}</Description>
		</Container>
	);
};
