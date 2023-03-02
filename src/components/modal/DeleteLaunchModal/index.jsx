import { useState } from "react";
import {
	Container,
	CloseButton,
	Inner,
	Heading,
	TextContainer,
	Text,
	Form,
	Bold,
	Controller,
	Cancel,
	Submit,
} from "./styles";
import { Close } from "asset/svg";
import { InputWithLabel } from "components/input";
import {
	useDeleteLaunchRequestMutation,
	useLazyGetUserDraftQuery,
	useLazyGetUserSubmittedQuery,
} from "services/launchService";
import { Puff } from "react-loading-icons";

export const DeleteLaunchModal = ({ hide, launchCode }) => {
	const [value, setValue] = useState("");
	const [deleteLaunch, { isLoading }] = useDeleteLaunchRequestMutation();
	const [getDraft, draftState] = useLazyGetUserDraftQuery();
	const [getSubmitted, submittedState] = useLazyGetUserSubmittedQuery();

	const deleteAction = async (event) => {
		event.preventDefault();
		await deleteLaunch({
			launchCode,
		});
		await getDraft();
		await getSubmitted();
		hide();
	};

	const loading =
		isLoading || draftState.isLoading || submittedState.isLoading;

	return (
		<Container>
			<CloseButton onClick={hide}>
				<Close />
			</CloseButton>
			<Inner>
				<TextContainer>
					<Heading>Delete Registration?</Heading>
					<Text>
						Deleting will remove all the information from database.
						This cannot be undone.
					</Text>
				</TextContainer>
				<Form onSubmit={deleteAction}>
					<InputWithLabel
						name={"delete"}
						label={
							<>
								To confirm this, type <Bold>Delete</Bold>
							</>
						}
						labelStyle={"label"}
						type={"text"}
						value={value}
						onChange={(event) => setValue(event.target.value)}
					/>
					<Controller>
						<Cancel onClick={hide}>Cancel</Cancel>
						<Submit
							disabled={
								value.toLowerCase() !== "delete" || loading
							}
							type="submit"
						>
							{loading ? (
								<Puff stroke="white" width={25} />
							) : (
								"Delete Registration"
							)}
						</Submit>
					</Controller>
				</Form>
			</Inner>
		</Container>
	);
};
