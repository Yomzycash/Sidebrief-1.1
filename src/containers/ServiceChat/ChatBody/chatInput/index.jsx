import {
	SubjectInput,
	TextBody,
	TextInput,
	TextInputForm,
	Wrapper,
	FileBeforeUpload,
	Close,
	Files,
} from "./style";
import { CommonButton } from "components/button";
import { Send } from "asset/svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageSchema } from "../constants";
import { SlateEditor } from "components/input";
import { useState } from "react";

export const ChatInput = () => {
	const [folder] = useState(new DataTransfer());
	const [files, setFiles] = useState([]);

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(messageSchema),
	});

	const sendMessage = (data) => {
		console.log(data);
		reset();
	};

	// const dataFiles = new DataTransfer();

	const fileCollector = (files) => {
		Array.from(files).forEach((file) => {
			folder.items.add(file);
		});
		setFiles(Array.from(folder.files));
		setValue("files", folder.files);
	};

	const removeFile = (index) => {
		folder.items.remove(index);
		setFiles(Array.from(folder.files));
		setValue("files", folder.files);
	};

	return (
		<TextInputForm onSubmit={handleSubmit(sendMessage)}>
			<SubjectInput placeholder="Subject" {...register("subject")} />
			<TextBody>
				<Wrapper>
					<SlateEditor
						placeholder="Send a message..."
						setValue={setValue}
					/>
					<Files>
						{files.map((file, index) => {
							return (
								<FileBeforeUpload key={index}>
									{file.name}
									<Close onClick={() => removeFile(index)}>
										X
									</Close>
								</FileBeforeUpload>
							);
						})}
					</Files>
				</Wrapper>
				<CommonButton type={"submit"} text={"Send"} RightIcon={Send} />
			</TextBody>
			<input
				id="files"
				name="files"
				type="file"
				style={{ display: "none" }}
				multiple
				onChange={(event) => fileCollector(event.target.files)}
			/>
		</TextInputForm>
	);
};
