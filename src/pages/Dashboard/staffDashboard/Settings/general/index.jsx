import {
	DetailContainer,
	Top,
	ProfileImage,
	NameContainer,
	Frame,
	Name,
	Title,
	ButtonContainer,
	Button,
	FilledButton,
} from "./styles";
import ProfileDetail from "components/profileDetails";
import { ReactComponent as User } from "asset/svg/profileUser.svg";

export default function StaffGeneral() {
	return (
		<>
			<Top>
				<NameContainer>
					<ProfileImage>
						<User />
					</ProfileImage>
					<Frame>
						<Name>Abdulsalam Akinlusi</Name>
						<Title>Compliance officer</Title>
					</Frame>
				</NameContainer>
				<ButtonContainer>
					<Button>Cancel</Button>
					<FilledButton>Save changes</FilledButton>
				</ButtonContainer>
			</Top>
			<DetailContainer>
				<ProfileDetail />
			</DetailContainer>
		</>
	);
}
