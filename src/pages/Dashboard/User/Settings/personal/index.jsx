import { useEffect, useState } from "react";
import {
	Container,
	TopFrame,
	UserContainer,
	NameAndPost,
	Name,
	Position,
	EditButton,
	BottomFrame,
	GridLayout,
	SubmitOrCancel,
	Cancel,
	Submit,
	PictureUploadContainer,
	UploadText,
	ClickToUpload,
	ErrorText,
} from "./style";
import { User, EditGreySvg } from "asset/svg";
import { data, updateDataSchema } from "./constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputWithLabel } from "components/input";
import { useSelector } from "react-redux";

const Personal = () => {
	const [editable, setEditable] = useState(false);

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(updateDataSchema),
	});

	const updateInfo = (data) => {
		console.log(data);
		setEditable(false);
	};

	const userInfo = useSelector((store) => store.UserDataReducer.userInfo);

	// this useEffect runs once on render, nothing should be in the dependency array
	useEffect(() => {
		data.forEach((el) => {
			setValue(el.name, el.value);
		});
		setEditable(false);
	}, []);

	return (
		<Container onSubmit={handleSubmit(updateInfo)}>
			<TopFrame>
				<UserContainer>
					{/* SVG should be changed when there is an image available */}
					<User />
					<NameAndPost>
						<Name>
							{`${userInfo.first_name} ${userInfo.last_name}`}
						</Name>
						<Position>Compliance officer</Position>
					</NameAndPost>
				</UserContainer>
				{!editable ? (
					<EditButton
						type={"button"}
						onClick={() => setEditable(true)}
					>
						<EditGreySvg />
						Edit
					</EditButton>
				) : (
					<SubmitOrCancel>
						<Cancel
							type={"button"}
							onClick={() => {
								setEditable(false);
								// change back to default values
								data.forEach((el) => {
									setValue(el.name, el.value);
								});
							}}
						>
							Cancel
						</Cancel>
						<Submit type={"submit"}>Save Changes</Submit>
					</SubmitOrCancel>
				)}
			</TopFrame>
			<BottomFrame>
				{editable ? (
					<PictureUploadContainer>
						<UploadText>
							<h6>Your photo</h6>
							<p>This will be displayed on your profile</p>
						</UploadText>
						<ClickToUpload>
							<input
								type={"file"}
								{...register("profile_image")}
							/>
							<ErrorText>
								{errors["profile_image"]?.message}
							</ErrorText>
							{/* SVG should be changed when there is an image available */}
							<User />
						</ClickToUpload>
					</PictureUploadContainer>
				) : null}
				<GridLayout>
					{data.map((el, index) => (
						<InputWithLabel
							key={index}
							label={el.label}
							name={el.name}
							type={"text"}
							disable={
								el.name === "email_address" ? true : !editable
							}
							register={register}
							inputClass={
								el.name === "email_address"
									? "emailstyle"
									: null
							}
							errorMessage={errors[el.name]?.message}
						/>
					))}
				</GridLayout>
			</BottomFrame>
		</Container>
	);
};

export default Personal;
