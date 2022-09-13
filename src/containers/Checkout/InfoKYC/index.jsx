import React from "react";
import { Container, Name, ContentWrapper } from "./style";
import FileUpload from "components/FileUpload";

// Provides a container for the file upload inputs
// uses grid align already, responsive too
export const CheckoutInfoKYC = ({ name }) => {
	return (
		<Container>
			<Name>{name}</Name>
			<ContentWrapper>
				<FileUpload
					TopText={"Government Issued ID"}
					BottomText={
						"You can either upload a Driver’s Licence, National ID Card, Voters Card or International Passport"
					}
				/>
				<FileUpload
					TopText={"Proof of Home Address"}
					BottomText={
						"You can either upload Utility Bill, Water Co operation Bill Or a Rent Invoive"
					}
				/>
				<FileUpload
					TopText={"Passport Photograph"}
					BottomText={
						"Please ensure passport photograph is not more than 5MB"
					}
				/>
			</ContentWrapper>
		</Container>
	);
};
