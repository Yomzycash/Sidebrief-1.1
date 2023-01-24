import {
	TopFrame,
	UserContainer,
	NameAndPost,
	Name,
	Position,
	EditButton,
} from "./style";
import { User, EditGreySvg } from "asset/svg";

const Personal = () => {
	return (
		<>
			<TopFrame>
				<UserContainer>
					<User />
					<NameAndPost>
						<Name>Akinyemi Adebisi</Name>
						<Position>Compliance officer</Position>
					</NameAndPost>
				</UserContainer>
				<EditButton>
					<EditGreySvg />
					Edit
				</EditButton>
			</TopFrame>
		</>
	);
};

export default Personal;
